import { Helmet } from 'react-helmet-async';

/**
 * Preconnect links for performance optimization
 * Establishes early connections to external domains
 */
const PreconnectLinks = () => {
  return (
    <Helmet>
      {/* Supabase */}
      <link rel="preconnect" href="https://feiowwunorclgnwngoar.supabase.co" />
      <link rel="dns-prefetch" href="https://feiowwunorclgnwngoar.supabase.co" />
      
      {/* Google Fonts (if used) */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      
      {/* CDN domains for assets */}
      <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
      <link rel="dns-prefetch" href="https://unpkg.com" />
    </Helmet>
  );
};

export default PreconnectLinks;