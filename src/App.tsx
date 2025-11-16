import { Routes, Route, useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { SEOHead } from "./components/SEOHead";
import { getPageMetadata, siteMetadata } from "./config/seo";
import { PesquisaPage } from "./components/pages/PesquisaPage";
import { ObrigadoPage } from "./components/pages/ObrigadoPage";

export default function App() {
  const location = useLocation();

  // Map location pathname to page name for SEO
  const getPageName = (pathname: string): string => {
    if (pathname === '/obrigado') return 'obrigado';
    return 'home';
  };

  const currentPage = getPageName(location.pathname);

  // Get current page metadata
  const pageMetadata = getPageMetadata(currentPage);
  const canonical = currentPage === 'home' 
    ? siteMetadata.siteUrl
    : `${siteMetadata.siteUrl}/${currentPage}`;

  // Página de obrigado não deve ser indexada
  const shouldNoindex = currentPage === 'obrigado';

  return (
    <>
      <SEOHead
        title={pageMetadata.title}
        description={pageMetadata.description}
        canonical={canonical}
        ogImage={pageMetadata.ogImage}
        ogType={pageMetadata.ogType}
        keywords={pageMetadata.keywords}
        noindex={shouldNoindex}
      />
      <Routes>
        <Route 
          path="/" 
          element={<PesquisaPage />} 
        />
        <Route 
          path="/obrigado" 
          element={<ObrigadoPage />} 
        />
      </Routes>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
