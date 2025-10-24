import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/json',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: { headers: { 'x-my-custom-header': 'leads-post' } },
      }
    );

    const {
      firstName,
      lastName,
      countryResidence,
      phoneCountryCode,
      phoneNumber,
      email,
      bedroomsChoice,
      buyTimeline,
      buyPurpose,
      brokerAssisted,
      brokerType,
      brokerAgency,
      consent,
      utmSource,
      utmMedium,
      utmCampaign,
      utmTerm,
      utmContent,
    } = await req.json();

    // Auto-capture additional data
    const pageReferrer = req.headers.get('Referer') || null;
    const userAgent = req.headers.get('User-Agent') || null;
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('X-Real-IP') || req.headers.get('CF-Connecting-IP') || null;

    // Basic validation (more robust validation will be on the client-side with Zod)
    if (!firstName || !lastName || !countryResidence || !phoneCountryCode || !phoneNumber || !email || !bedroomsChoice || !buyTimeline || !buyPurpose || brokerAssisted === undefined || consent === undefined) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    const { data, error } = await supabaseClient
      .from('leads')
      .insert({
        first_name: firstName,
        last_name: lastName,
        country_residence: countryResidence,
        phone_country_code: phoneCountryCode,
        phone_number: phoneNumber,
        email: email,
        bedrooms_choice: bedroomsChoice,
        buy_timeline: buyTimeline,
        buy_purpose: buyPurpose,
        broker_assisted: brokerAssisted,
        broker_type: brokerType,
        broker_agency: brokerAgency,
        consent: consent,
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
        utm_term: utmTerm,
        utm_content: utmContent,
        page_referrer: pageReferrer,
        ip: ip,
        user_agent: userAgent,
      })
      .select('id')
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: corsHeaders,
      });
    }

    return new Response(JSON.stringify({ ok: true, leadId: data.id }), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error('Edge Function error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: corsHeaders,
    });
  }
});