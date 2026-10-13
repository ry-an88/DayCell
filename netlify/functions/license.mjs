// Licence checks for the web version, backed by Polar (polar.sh) licence keys.
// The app posts here (same origin) and this forwards the call to Polar's customer-portal licence API.
// It also makes sure the key belongs to YOUR product and strips the buyer's name/email before anything
// goes back to the browser.
//
// The replies keep one small shape whatever the provider is, so the app never needs to know:
//   { activated, valid, deactivated, error, status, instance_id }
//
// Set these in Netlify → Site configuration → Environment variables:
//   POLAR_ORG_ID      your Polar organization ID (a UUID)
//   POLAR_BENEFIT_ID  optional: the ID of the Daycell Pro licence-key benefit; when set, keys from any
//                     other benefit in your organization are refused
//   POLAR_API_URL     optional: https://sandbox-api.polar.sh while testing with a Polar sandbox account

const ACTIONS = new Set(['activate', 'validate', 'deactivate']);

const reply = (body, status = 200) => Response.json(body, { status });

export default async (req) => {
  if (req.method !== 'POST') return reply({ error: 'method not allowed' }, 405);

  const input = await req.json().catch(() => ({}));
  const { action } = input;
  if (!ACTIONS.has(action)) return reply({ error: 'unknown action' }, 400);

  const { POLAR_ORG_ID, POLAR_BENEFIT_ID } = process.env;
  const base = (process.env.POLAR_API_URL || 'https://api.polar.sh').replace(/\/$/, '');
  if (!POLAR_ORG_ID) return reply({ error: 'licensing is not set up yet.' }, 503);

  const key = String(input.license_key || '').slice(0, 200);
  if (!key) return reply({ error: 'licence key not found.' }, 400);

  const body = { key, organization_id: POLAR_ORG_ID };
  if (action === 'activate') body.label = String(input.instance_name || 'device').slice(0, 200);
  else if (input.instance_id) body.activation_id = String(input.instance_id).slice(0, 100);
  if (action === 'deactivate' && !body.activation_id) return reply({ deactivated: false, error: 'this device has no activation to remove.' }, 400);

  let res, data = {};
  try {
    res = await fetch(`${base}/v1/customer-portal/license-keys/${action}`, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.status !== 204) data = await res.json().catch(() => ({}));
  } catch {
    return reply({ error: 'licence server unreachable' }, 502);
  }

  const detail = String(data.detail ?? data.error ?? '');
  const refused = (what) => reply({ activated: false, valid: false, error: what }, 403);
  // a key from another product in your Polar organization must not unlock this app
  const foreign = (lk) => !!(POLAR_BENEFIT_ID && lk && lk.benefit_id && lk.benefit_id !== POLAR_BENEFIT_ID);

  if (action === 'deactivate') {
    // already gone counts as freed: the goal is that this device no longer holds an activation
    if (res.status === 204 || res.status === 404) return reply({ deactivated: true });
    return reply({ deactivated: false, error: detail || "couldn't remove this device." }, res.ok ? 502 : res.status);
  }

  if (action === 'activate') {
    if (res.ok) {
      const lk = data.license_key || {};
      if (foreign(lk)) return refused('this key is for a different product.');
      if (lk.status && lk.status !== 'granted') return refused('this key is disabled.');
      return reply({ activated: true, instance_id: data.id ?? null, status: 'active' });
    }
    if (res.status === 404) return reply({ activated: false, error: 'licence key not found.' }, 404);
    if (/limit/i.test(detail)) return reply({ activated: false, error: 'activation limit reached.' }, 403);
    if (res.status === 403) return reply({ activated: false, error: 'this key is disabled.' }, 403);
    return reply({ activated: false, error: detail || "that key didn't work." }, res.status >= 500 ? 502 : res.status);
  }

  // validate: only a clear "no" ever says valid:false. Server trouble leaves `valid` unset so the app changes nothing.
  if (res.ok) {
    const gone = data.expires_at && new Date(data.expires_at).getTime() < Date.now();
    const ok = data.status === 'granted' && !gone && !foreign(data);
    return reply({ valid: ok, status: ok ? 'active' : gone ? 'expired' : (data.status || 'disabled'), instance_id: data.activation?.id ?? null });
  }
  if (res.status === 404) return reply({ valid: false, status: 'invalid', error: 'licence key not found.' }, 404);
  return reply({ error: detail || 'licence server trouble' }, 502);
};

export const config = { path: '/api/license' };
