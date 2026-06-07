import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const SITE_URL = 'https://toolsml.com/';
const SITEMAP_PATH = 'https://toolsml.com/sitemap-index.xml';
const GATEWAY = 'https://connector-gateway.lovable.dev/google_search_console';

function gscHeaders() {
  const lovableKey = Deno.env.get('LOVABLE_API_KEY');
  const gscKey = Deno.env.get('GOOGLE_SEARCH_CONSOLE_API_KEY');
  if (!lovableKey || !gscKey) {
    throw new Error('Google Search Console connection is not linked to this project.');
  }
  return {
    Authorization: `Bearer ${lovableKey}`,
    'X-Connection-Api-Key': gscKey,
    'Content-Type': 'application/json',
  };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    // Admin auth
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } },
    );
    const token = authHeader.replace('Bearer ', '');
    const { data: claimData, error: claimErr } = await supabase.auth.getClaims(token);
    if (claimErr || !claimData?.claims) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    const { data: isAdmin } = await supabase.rpc('has_role', {
      _user_id: claimData.claims.sub, _role: 'admin',
    });
    if (!isAdmin) {
      return new Response(JSON.stringify({ error: 'Forbidden' }), {
        status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const headers = gscHeaders();
    const encodedSite = encodeURIComponent(SITE_URL);
    const encodedFeed = encodeURIComponent(SITEMAP_PATH);

    // 1. Submit (PUT) — idempotent resubmit request
    const submitRes = await fetch(
      `${GATEWAY}/webmasters/v3/sites/${encodedSite}/sitemaps/${encodedFeed}`,
      { method: 'PUT', headers },
    );
    const submitted = submitRes.ok;
    const submitBody = submitRes.ok ? null : await submitRes.text();

    // 2. Fetch latest status (GET)
    const statusRes = await fetch(
      `${GATEWAY}/webmasters/v3/sites/${encodedSite}/sitemaps/${encodedFeed}`,
      { method: 'GET', headers },
    );
    const statusJson = statusRes.ok ? await statusRes.json() : null;
    const statusError = statusRes.ok ? null : await statusRes.text();

    return new Response(JSON.stringify({
      siteUrl: SITE_URL,
      sitemap: SITEMAP_PATH,
      submitted,
      submitError: submitBody,
      status: statusJson,
      statusError,
    }), { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});