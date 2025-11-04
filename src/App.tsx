import { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
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
  const [currentPage, setCurrentPage] = useState("home");
  const [persona, setPersona] = useState<'anfitriao' | 'nomade' | ''>('');

  // Handle browser back/forward
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      setCurrentPage(event.state?.page || "home");
    };

    window.addEventListener("popstate", handlePopState);
    return () =>
      window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    window.history.pushState({ page }, "", `#${page}`);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={navigateTo} persona={persona} setPersona={setPersona} />;
      case "pesquisa":
        return <PesquisaPage onNavigate={navigateTo} persona={persona} setPersona={setPersona} />;
      case "obrigado":
        return <ObrigadoPage onNavigate={navigateTo} />;
      case "como-funciona":
        return <ComoFuncionaPage onNavigate={navigateTo} />;
      case "hospedes":
        return <HospedesPage onNavigate={navigateTo} />;
      case "anfitrioes":
        return (
          <PlaceholderPage
            title="Para Anfitriões"
            description="Disponibilize sua propriedade com autonomia completa."
          />
        );
      case "arbitragem":
        return (
          <PlaceholderPage
            title="Arbitragem"
            description="Mediação independente para resolução justa de conflitos."
          />
        );
      case "hubs":
        return (
          <PlaceholderPage
            title="Hubs Piloto"
            description="Conheça as cidades onde a Fristad está ativa."
          />
        );
      case "sobre":
        return <SobrePage onNavigate={navigateTo} />;
      case "faq":
        return (
          <PlaceholderPage
            title="Perguntas Frequentes"
            description="Respostas para as dúvidas mais comuns sobre a Fristad."
          />
        );
      case "contato":
        return (
          <PlaceholderPage
            title="Contato"
            description="Entre em contato conosco para dúvidas ou suporte."
          />
        );
      case "legal":
        return (
          <PlaceholderPage
            title="Termos de Uso"
            description="Termos legais e condições de uso da plataforma."
          />
        );
      case "privacidade":
        return (
          <PlaceholderPage
            title="Política de Privacidade"
            description="Como protegemos e utilizamos seus dados pessoais."
          />
        );
      default:
        return <HomePage onNavigate={navigateTo} />;
    }
  };

  const getPageTitle = () => {
    const titles: Record<string, string> = {
      home: "Fristad - Moradia Sem Fronteiras",
      pesquisa: "Pesquisa e Cadastro - Fristad",
      obrigado: "Obrigado - Fristad",
      "como-funciona": "Como Funciona - Fristad",
      hospedes: "Para Hóspedes - Fristad",
      anfitrioes: "Para Anfitriões - Fristad",
      arbitragem: "Arbitragem - Fristad",
      hubs: "Hubs Piloto - Fristad",
      sobre: "Sobre - Fristad",
      faq: "FAQ - Fristad",
      contato: "Contato - Fristad",
      legal: "Termos de Uso - Fristad",
      privacidade: "Política de Privacidade - Fristad",
    };
    return (
      titles[currentPage] || "Fristad - Moradia Sem Fronteiras"
    );
  };

  // Update document title
  useEffect(() => {
    document.title = getPageTitle();
  }, [currentPage]);

  return (
    <>
      <Layout currentPage={currentPage} onNavigate={navigateTo}>
        {renderPage()}
      </Layout>
      <Analytics />
      <SpeedInsights />
    </>
  );
}