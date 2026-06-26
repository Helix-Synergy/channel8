import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, name, type, url, image }) => {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title ? `${title} - Channel 8 Network` : 'Channel 8 Network - One Network. Infinite Voices.'}</title>
      <meta name='description' content={description || "A dynamic digital media and content broadcasting company delivering credible, engaging, and informative stories across multiple digital platforms."} />
      
      {/* End standard metadata tags */}
      
      {/* Open Graph tags (Facebook/LinkedIn) */}
      <meta property="og:type" content={type || 'website'} />
      <meta property="og:title" content={title ? `${title} - Channel 8 Network` : 'Channel 8 Network'} />
      <meta property="og:description" content={description || "A dynamic digital media and content broadcasting company delivering credible, engaging, and informative stories."} />
      {url && <meta property="og:url" content={url} />}
      <meta property="og:image" content={image || "https://channel8network.online/channel8_logo_center.png"} />
      
      {/* Twitter tags */}
      <meta name="twitter:creator" content={name || 'Channel 8 Network'} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title ? `${title} - Channel 8 Network` : 'Channel 8 Network'} />
      <meta name="twitter:description" content={description || "A dynamic digital media and content broadcasting company delivering credible, engaging, and informative stories."} />
      <meta name="twitter:image" content={image || "https://channel8network.online/channel8_logo_center.png"} />
      
      {/* Canonical Link */}
      {url && <link rel="canonical" href={url} />}
    </Helmet>
  );
}

export default SEO;
