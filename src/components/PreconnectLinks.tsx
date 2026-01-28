import { Helmet } from 'react-helmet-async';

/**
 * Preconnect links for performance optimization
 * Establishes early connections to external domains
 * Note: Primary preconnects are in index.html for earliest possible execution
 */
const PreconnectLinks = () => {
  return (
    <Helmet>
      {/* Additional preconnects handled via React Helmet */}
      {/* Primary fonts preconnect is in index.html for LCP optimization */}
      <link rel="dns-prefetch" href="//cdn.jsdelivr.net" />
      <link rel="dns-prefetch" href="//unpkg.com" />
    </Helmet>
  );
};

export default PreconnectLinks;