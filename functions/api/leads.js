// Cloudflare Pages Function — Leads API
// Uses jsonblob.com as free cloud storage (no KV binding needed)

const BLOB_URL = 'https://jsonblob.com/api/jsonBlob/019cf3c5-01d3-7a02-a103-3278af4373b5';

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
export async function onRequestGet() {
  try {
    const resp = await fetch(BLOB_URL, {
      headers: { 'Accept': 'application/json' }
    });
    const data = await resp.json();
    return new Response(JSON.stringify({ leads: data.leads || [] }), {
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

    // Read current leads
    const getResp = await fetch(BLOB_URL, {
      headers: { 'Accept': 'application/json' }
    });
    const data = await getResp.json();
    const leads = data.leads || [];

    // Append new lead
    leads.push(lead);

    // Write back
    await fetch(BLOB_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ leads: leads })
    });

    // Send email notification (server-side, non-blocking)
    const tierLabel = (lead.tier || 'NEW').toUpperCase();
    const sourceLabel = lead.source === 'google-landing' ? 'Landing Page' :
      lead.source === 'chatbot' ? 'Chatbot' :
      lead.source === 'contact-form' ? 'Contact Form' :
      lead.source === 'popup' ? 'Popup' : lead.source || 'Website';
    const subject = '[' + tierLabel + ' LEAD] ' + (lead.name || 'Unknown') + ' - ' + (lead.service || sourceLabel);

    fetch('https://formsubmit.co/ajax/65a6ab2ee87c151ffec81e39d824f727', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': 'https://itsallthingsautomated.com',
        'Referer': 'https://itsallthingsautomated.com/'
      },
      body: JSON.stringify({
        _subject: subject,
        Name: lead.name || 'Not provided',
        Email: lead.email || 'Not provided',
        Phone: lead.phone || 'Not provided',
        Service: lead.service || 'Not specified',
        Budget: lead.budget || 'N/A',
        Timeline: lead.timeline || 'N/A',
        Address: lead.address || 'Not provided',
        Source: sourceLabel,
        'Lead Score': lead.score ? (lead.score + '/100 (' + tierLabel + ')') : 'N/A',
        Message: lead.message || 'None',
        _template: 'table'
      })
    }).catch(() => {});

    return new Response(JSON.stringify({ success: true, lead: lead }), {
      status: 200, headers: CORS_HEADERS
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500, headers: CORS_HEADERS
    });
  }
}