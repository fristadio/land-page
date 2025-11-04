import { useEffect } from 'react';
import { siteMetadata } from '../config/seo';

export interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  keywords?: string[];
  noindex?: boolean;
}

export function SEOHead({
  title,
  description,
  canonical = siteMetadata.siteUrl,
  ogImage = siteMetadata.defaultOgImage,
  ogType = 'website',
  keywords = [],
  noindex = false,
}: SEOHeadProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Helper function to set or update meta tags
    const setMetaTag = (property: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${property}"]`);
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, property);
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Helper function to set or update link tags
    const setLinkTag = (rel: string, href: string) => {
      let link = document.querySelector(`link[rel="${rel}"]`);
      
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        document.head.appendChild(link);
      }
      
      link.setAttribute('href', href);
    };

    // Basic meta tags
    setMetaTag('description', description);
    
    if (keywords.length > 0) {
      setMetaTag('keywords', keywords.join(', '));
    }

    if (noindex) {
      setMetaTag('robots', 'noindex, nofollow');
    } else {
      setMetaTag('robots', 'index, follow');
    }

    // Canonical URL
    setLinkTag('canonical', canonical);

    // Open Graph tags
    setMetaTag('og:title', title, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:url', canonical, true);
    setMetaTag('og:type', ogType, true);
    setMetaTag('og:site_name', siteMetadata.siteName, true);
    setMetaTag('og:locale', siteMetadata.locale, true);
    setMetaTag('og:locale:alternate', siteMetadata.localeAlternate, true);
    
    // Full URL for OG image
    const fullImageUrl = ogImage.startsWith('http') 
      ? ogImage 
      : `${siteMetadata.siteUrl}${ogImage}`;
    setMetaTag('og:image', fullImageUrl, true);
    setMetaTag('og:image:width', '1200', true);
    setMetaTag('og:image:height', '630', true);
    setMetaTag('og:image:alt', title, true);

    // Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', fullImageUrl);
    setMetaTag('twitter:image:alt', title);
    
    if (siteMetadata.twitterHandle) {
      setMetaTag('twitter:site', siteMetadata.twitterHandle);
      setMetaTag('twitter:creator', siteMetadata.twitterHandle);
    }

    // Additional meta tags
    setMetaTag('author', siteMetadata.siteName);
    setMetaTag('language', 'pt-BR');

  }, [title, description, canonical, ogImage, ogType, keywords, noindex]);

  // Structured Data (JSON-LD)
  useEffect(() => {
    // Organization Schema
    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: siteMetadata.siteName,
      description: 'Plataforma descentralizada de moradia temporária',
      url: siteMetadata.siteUrl,
      logo: `${siteMetadata.siteUrl}/favicon.png`,
      sameAs: [
        // Adicionar redes sociais quando disponíveis
      ],
    };

    // WebSite Schema
    const websiteSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteMetadata.siteName,
      url: siteMetadata.siteUrl,
      description: 'Moradia sem fronteiras',
      inLanguage: 'pt-BR',
    };

    // BreadcrumbList Schema (for better navigation understanding)
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: siteMetadata.siteUrl,
        },
      ],
    };

    // Remove existing JSON-LD scripts
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(script => script.remove());

    // Add Organization schema
    const orgScript = document.createElement('script');
    orgScript.type = 'application/ld+json';
    orgScript.text = JSON.stringify(organizationSchema);
    document.head.appendChild(orgScript);

    // Add WebSite schema
    const siteScript = document.createElement('script');
    siteScript.type = 'application/ld+json';
    siteScript.text = JSON.stringify(websiteSchema);
    document.head.appendChild(siteScript);

    // Add Breadcrumb schema
    const breadcrumbScript = document.createElement('script');
    breadcrumbScript.type = 'application/ld+json';
    breadcrumbScript.text = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(breadcrumbScript);

    // Cleanup on unmount
    return () => {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      scripts.forEach(script => script.remove());
    };
  }, []); // Only run once on mount

  return null; // This component doesn't render anything
}

