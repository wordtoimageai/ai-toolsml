import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create a Supabase client with the service role key
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // Verify authorization (simple API key check or service role only)
    const authHeader = req.headers.get('Authorization')
    if (!authHeader?.includes(Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '')) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const { action } = await req.json()

    let result
    switch (action) {
      case 'cleanup_analytics':
        // Clean up analytics events older than 12 months
        result = await supabaseAdmin.rpc('cleanup_old_analytics_events')
        break
        
      case 'cleanup_affiliate_clicks':
        // Clean up affiliate clicks older than 6 months
        result = await supabaseAdmin.rpc('cleanup_old_affiliate_clicks')
        break
        
      case 'anonymize_analytics':
        // Anonymize analytics data older than 3 months
        result = await supabaseAdmin.rpc('anonymize_old_analytics')
        break
        
      case 'full_cleanup':
        // Run all cleanup tasks
        const [analytics, affiliate, anonymize] = await Promise.all([
          supabaseAdmin.rpc('cleanup_old_analytics_events'),
          supabaseAdmin.rpc('cleanup_old_affiliate_clicks'),
          supabaseAdmin.rpc('anonymize_old_analytics')
        ])
        
        result = {
          analytics: analytics.error || 'Success',
          affiliate: affiliate.error || 'Success',
          anonymize: anonymize.error || 'Success'
        }
        break
        
      default:
        return new Response(
          JSON.stringify({ error: 'Invalid action. Use: cleanup_analytics, cleanup_affiliate_clicks, anonymize_analytics, or full_cleanup' }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
    }

    if (result.error) {
      console.error('Cleanup error:', result.error)
      return new Response(
        JSON.stringify({ error: result.error }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Log successful cleanup
    await supabaseAdmin.rpc('log_security_event', {
      p_event_type: 'data_cleanup',
      p_event_data: { action, timestamp: new Date().toISOString() },
      p_severity: 'info'
    })

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `${action} completed successfully`,
        timestamp: new Date().toISOString(),
        result
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Privacy cleanup error:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})