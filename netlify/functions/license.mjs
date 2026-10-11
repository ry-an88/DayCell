// Licence checks for the web version.
// Lemon Squeezy's License API can't be called straight from a web page (it blocks cross-site requests),
// so the app posts here and this forwards the call. It also makes sure the key belongs to YOUR product
// and strips the buyer's name/email before anything goes back to the browser.
//
// Set these in Netlify → Site configuration → Environment variables:
//   LS_STORE_ID    your Lemon Squeezy store id
//   LS_PRODUCT_ID  the product id of the journal app

const ACTIONS = new Set(['activate', 'validate', 'deactivate']);
const FIELDS = ['license_key', 'instance_name', 'instance_id'];

export default async (req) => {
  if (req.method !== 'POST') return Response.json({ error: 'method not allowed' }, { status: 405 });

  const input = await req.json().catch(() => ({}));
  if (!ACTIONS.has(input.action)) return Response.json({ error: 'unknown action' }, { status: 400 });

  const body = new URLSearchParams();
  for (const k of FIELDS) if (input[k]) body.set(k, String(input[k]).slice(0, 200));

  let res, data;
  try {
    res = await fetch(`https://api.lemonsqueezy.com/v1/licenses/${input.action}`, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });
    data = await res.json();
  } catch {
    return Response.json({ error: 'licence server unreachable' }, { status: 502 });
  }

  // a key from someone else's Lemon Squeezy product must not unlock this app
  const { LS_STORE_ID, LS_PRODUCT_ID } = process.env;
  const meta = data.meta || {};
  const foreign = (LS_STORE_ID && String(meta.store_id) !== LS_STORE_ID) || (LS_PRODUCT_ID && String(meta.product_id) !== LS_PRODUCT_ID);
  if (data.license_key && foreign) {
    return Response.json({ activated: false, valid: false, error: 'this key is for a different product.' }, { status: 403 });
  }

  return Response.json({
    activated: data.activated,
    valid: data.valid,
    deactivated: data.deactivated,
    error: data.error ?? null,
    status: data.license_key?.status ?? null,
    activation_limit: data.license_key?.activation_limit ?? null,
    activation_usage: data.license_key?.activation_usage ?? null,
    instance_id: data.instance?.id ?? null,
  }, { status: res.status });
};

export const config = { path: '/api/license' };
