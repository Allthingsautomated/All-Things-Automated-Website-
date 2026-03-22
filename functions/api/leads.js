// Cloudflare Pages Function — Leads API
// Uses Cloudflare KV for persistent storage (binding: LEADS_KV)

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
export async function onRequestGet({ env }) {
  try {
    const raw = await env.LEADS_KV.get('leads');
    const leads = raw ? JSON.parse(raw) : [];
    return new Response(JSON.stringify({ leads }), {
      status: 200, headers: CORS_HEADERS
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message, leads: [] }), {
      status: 200, headers: CORS_HEADERS
    });
  }
}

// POST /api/leads — save a new lead
export async function onRequestPost({ request, env }) {
  try {
    const lead = await request.json();

    // Add server-side timestamp and ID
    lead.id = Date.now() + '-' + Math.random().toString(36).substr(2, 6);
    lead.received = new Date().toISOString();
    lead.source = lead.source || 'contact-form';

    // Read current leads from KV
    const raw = await env.LEADS_KV.get('leads');
    const leads = raw ? JSON.parse(raw) : [];

    // Append new lead and write back
    leads.push(lead);
    await env.LEADS_KV.put('leads', JSON.stringify(leads));

    // Build notification strings
    const tierLabel = (lead.tier || 'NEW').toUpperCase();
    const sourceLabel =
      lead.source === 'google-landing' ? 'Landing Page' :
      lead.source === 'chatbot'        ? 'Chatbot' :
      lead.source === 'contact-form'   ? 'Contact Form' :
      lead.source === 'popup'          ? 'Popup' :
      lead.source || 'Website';

    const subject = '[' + tierLabel + ' LEAD] ' + (lead.name || 'Unknown') + ' - ' + (lead.service || sourceLabel);
    const smsBody = 'NEW LEAD: ' + (lead.name || 'Unknown') +
      ' | ' + (lead.service || 'General') +
      ' | ' + (lead.phone || 'No phone') +
      ' | ' + sourceLabel;

    // Push notification via ntfy.sh (install ntfy app, subscribe to: ata-leads-65a6ab2e)
    fetch('https://ntfy.sh/ata-leads-65a6ab2e', {
      method: 'POST',
      headers: { 'Title': subject, 'Priority': 'high', 'Tags': 'money_with_wings' },
      body: smsBody
    }).catch(() => {});

    // Email notification via FormSubmit
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
        Name:      lead.name    || 'Not provided',
        Email:     lead.email   || 'Not provided',
        Phone:     lead.phone   || 'Not provided',
        Service:   lead.service || 'Not specified',
        City:      lead.city    || 'Not provided',
        Message:   lead.message || 'None',
        Source:    sourceLabel,
        _template: 'table'
      })
    }).catch(() => {});

    return new Response(JSON.stringify({ success: true, lead }), {
      status: 200, headers: CORS_HEADERS
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500, headers: CORS_HEADERS
    });
  }
}
