// Unit tests for the licence function with faked Polar replies. Run with: node --test tests/license.unit.mjs
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

process.env.POLAR_ORG_ID = 'org-1';
process.env.POLAR_BENEFIT_ID = 'ben-1';
const { default: handler } = await import('../netlify/functions/license.mjs');

let calls;
const polar = (status, body) => {
  globalThis.fetch = async (url, init) => {
    calls.push({ url, body: JSON.parse(init.body) });
    return status === 204 ? new Response(null, { status }) : Response.json(body, { status });
  };
};
const call = async (input) => {
  const res = await handler(new Request('http://x/api/license', { method: 'POST', body: JSON.stringify(input) }));
  return { status: res.status, ...(await res.json()) };
};
beforeEach(() => { calls = []; });

test('activate: sends the org id and a label, returns only the activation id', async () => {
  polar(200, { id: 'act-1', license_key: { status: 'granted', benefit_id: 'ben-1' }, customer: { email: 'a@b.c', name: 'A' } });
  const r = await call({ action: 'activate', license_key: 'K-1', instance_name: 'Safari on iPad' });
  assert.equal(r.activated, true);
  assert.equal(r.instance_id, 'act-1');
  assert.deepEqual(Object.keys(r).sort(), ['activated', 'instance_id', 'status']);
  assert.equal(calls[0].url, 'https://api.polar.sh/v1/customer-portal/license-keys/activate');
  assert.deepEqual(calls[0].body, { key: 'K-1', organization_id: 'org-1', label: 'Safari on iPad' });
});

test('activate: a key from another benefit is refused', async () => {
  polar(200, { id: 'act-1', license_key: { status: 'granted', benefit_id: 'other' } });
  const r = await call({ action: 'activate', license_key: 'K-1' });
  assert.equal(r.activated, false);
  assert.match(r.error, /different product/);
});

test('activate: unknown key, activation limit and revoked key get the messages the app looks for', async () => {
  polar(404, { error: 'ResourceNotFound', detail: 'Not found' });
  assert.match((await call({ action: 'activate', license_key: 'nope' })).error, /not found/);
  polar(403, { error: 'NotPermitted', detail: 'License key activation limit already reached' });
  assert.match((await call({ action: 'activate', license_key: 'K' })).error, /activation limit/);
  polar(200, { id: 'a', license_key: { status: 'revoked', benefit_id: 'ben-1' } });
  assert.match((await call({ action: 'activate', license_key: 'K' })).error, /disabled/);
});

test('validate: granted is valid, revoked is not, server trouble leaves valid unset', async () => {
  polar(200, { status: 'granted', expires_at: null, benefit_id: 'ben-1', activation: { id: 'act-1' }, customer: { email: 'a@b.c' } });
  const ok = await call({ action: 'validate', license_key: 'K', instance_id: 'act-1' });
  assert.equal(ok.valid, true);
  assert.equal(calls[0].body.activation_id, 'act-1');
  assert.equal(JSON.stringify(ok).includes('a@b.c'), false);

  polar(200, { status: 'revoked', benefit_id: 'ben-1' });
  assert.equal((await call({ action: 'validate', license_key: 'K' })).valid, false);

  polar(500, {});
  const down = await call({ action: 'validate', license_key: 'K' });
  assert.equal(down.valid, undefined);
  assert.equal(down.status, 502);

  globalThis.fetch = async () => { throw new Error('offline'); };
  assert.equal((await call({ action: 'validate', license_key: 'K' })).valid, undefined);
});

test('deactivate: 204 frees the activation, and an already-missing one counts as freed', async () => {
  polar(204);
  assert.equal((await call({ action: 'deactivate', license_key: 'K', instance_id: 'act-1' })).deactivated, true);
  assert.deepEqual(calls[0].body, { key: 'K', organization_id: 'org-1', activation_id: 'act-1' });
  polar(404, { error: 'ResourceNotFound', detail: 'x' });
  assert.equal((await call({ action: 'deactivate', license_key: 'K', instance_id: 'act-1' })).deactivated, true);
  assert.equal((await call({ action: 'deactivate', license_key: 'K' })).deactivated, false);
});

test('bad requests: wrong method, unknown action, missing key', async () => {
  assert.equal((await handler(new Request('http://x/api/license'))).status, 405);
  assert.equal((await call({ action: 'delete' })).status, 400);
  assert.equal((await call({ action: 'activate' })).status, 400);
});
