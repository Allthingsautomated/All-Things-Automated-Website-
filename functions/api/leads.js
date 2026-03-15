// Cloudflare Pages Function — Leads API
// Stores and retrieves leads via Cloudflare KV
// Binding required: KV namespace named "LEADS"

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json'
};
// Handle CORS preflight
export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

// GET /api/leads — retrieve all leads
export async function onRequestGet(context) {
  try {
    if (!context.env.LEADS) {
      return new Response(JSON.stringify({ error: 'KV not bound', leads: [] }), {
        status: 200, headers: CORS_HEADERS
      });
    }
    const data = await context.env.LEADS.get('all_leads');
    const leads = data ? JSON.parse(data) : [];
    return new Response(JSON.stringify({ leads: leads }), {
      status: 200, headers: CORS_HEADERS
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message, leads: [] }), {
      status: 200, headers: CORS_HEADERS
    });
  }
}

// POST /api/leads — save a new lead
export async function onRequestPost(context) {
  try {
    const lead = await context.request.json();
    // Add server-side timestamp and ID
    lead.id = Date.now() + '-' + Math.random().toString(36).substr(2, 6);
    lead.received = new Date().toISOString();

    if (!context.env.LEADS) {
      return new Response(JSON.stringify({ success: false, error: 'KV not bound. Please bind LEADS KV namespace in Cloudflare dashboard.' }), {
        status: 200, headers: CORS_HEADERS
      });
    }

    // Get existing leads, append new one
    const data = await context.env.LEADS.get('all_leads');
    const leads = data ? JSON.parse(data) : [];
    leads.push(lead);
    await context.env.LEADS.put('all_leads', JSON.stringify(leads));
    return new Response(JSON.stringify({ success: true, lead: lead }), {
      status: 200, headers: CORS_HEADERS
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500, headers: CORS_HEADERS
    });
  }
}