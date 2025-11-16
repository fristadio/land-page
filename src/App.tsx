import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { SEOHead } from "./components/SEOHead";
import { getPageMetadata, siteMetadata } from "./config/seo";
import { Layout } from "./components/Layout";
import { HomePage } from "./components/pages/HomePage";
import { ComoFuncionaPage } from "./components/pages/ComoFuncionaPage";
import { HospedesPage } from "./components/pages/HospedesPage";
import { SobrePage } from "./components/pages/SobrePage";
import { PesquisaPage } from "./components/pages/PesquisaPage";
import { ObrigadoPage } from "./components/pages/ObrigadoPage";

// Placeholder components for other pages
function PlaceholderPage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 pt-20 pb-16">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h1>{title}</h1>
        <p className="text-xl text-muted-foreground">
          {description}
        </p>
        <div className="p-12 bg-muted/30 rounded-lg">
          <p className="text-muted-foreground">
            Esta página será implementada em breve.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const location = useLocation();
  const [persona, setPersona] = useState<'anfitriao' | 'nomade' | ''>('');

  // Map location pathname to page name for SEO and Layout
  const getPageName = (pathname: string): string => {
    const path = pathname.slice(1); // Remove leading /
    return path || 'home';
  };

  const currentPage = getPageName(location.pathname);

  // Get current page metadata
  const pageMetadata = getPageMetadata(currentPage);
  const canonical = currentPage === 'home' 
    ? siteMetadata.siteUrl
    : `${siteMetadata.siteUrl}/${currentPage}`;

  // Páginas placeholder que não devem ser indexadas
  const placeholderPages = ['anfitrioes', 'arbitragem', 'hubs', 'faq', 'contato', 'legal', 'privacidade'];
  const isPlaceholder = placeholderPages.includes(currentPage);
  const shouldNoindex = isPlaceholder || currentPage === 'pesquisa' || currentPage === 'obrigado';

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
      <Layout currentPage={currentPage}>
        <Routes>
          <Route 
            path="/" 
            element={<HomePage persona={persona} setPersona={setPersona} />} 
          />
          <Route 
            path="/pesquisa" 
            element={<PesquisaPage persona={persona} setPersona={setPersona} />} 
          />
          <Route 
            path="/obrigado" 
            element={<ObrigadoPage />} 
          />
          <Route 
            path="/como-funciona" 
            element={<ComoFuncionaPage />} 
          />
          <Route 
            path="/hospedes" 
            element={<HospedesPage />} 
          />
          <Route 
            path="/sobre" 
            element={<SobrePage />} 
          />
          <Route
            path="/anfitrioes"
            element={
          <PlaceholderPage
            title="Para Anfitriões"
            description="Disponibilize sua propriedade com autonomia completa."
          />
            }
          />
          <Route
            path="/arbitragem"
            element={
          <PlaceholderPage
            title="Arbitragem"
            description="Mediação independente para resolução justa de conflitos."
          />
            }
          />
          <Route
            path="/hubs"
            element={
          <PlaceholderPage
            title="Hubs Piloto"
            description="Conheça as cidades onde a Fristad está ativa."
          />
            }
          />
          <Route
            path="/faq"
            element={
          <PlaceholderPage
            title="Perguntas Frequentes"
            description="Respostas para as dúvidas mais comuns sobre a Fristad."
          />
            }
          />
          <Route
            path="/contato"
            element={
          <PlaceholderPage
            title="Contato"
            description="Entre em contato conosco para dúvidas ou suporte."
          />
            }
          />
          <Route
            path="/legal"
            element={
          <PlaceholderPage
            title="Termos de Uso"
            description="Termos legais e condições de uso da plataforma."
          />
            }
          />
          <Route
            path="/privacidade"
            element={
          <PlaceholderPage
            title="Política de Privacidade"
            description="Como protegemos e utilizamos seus dados pessoais."
          />
            }
          />
        </Routes>
    </Layout>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
