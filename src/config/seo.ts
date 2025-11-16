export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: 'website' | 'article';
}

export const siteMetadata = {
  siteName: 'Fristad',
  siteUrl: 'https://fristad.com.br',
  defaultOgImage: '/og-image.svg',
  twitterHandle: '@fristad',
  locale: 'pt_BR',
  localeAlternate: 'en_US',
};

export const pageMetadata: Record<string, PageMetadata> = {
  home: {
    title: 'Fristad - Moradia Sem Fronteiras',
    description: 'Plataforma descentralizada de moradia temporária conectando anfitriões e nômades digitais. Encontre acomodações únicas ou compartilhe sua propriedade ao redor do mundo.',
    keywords: ['moradia temporária', 'nômade digital', 'hospedagem', 'aluguel temporário', 'anfitriões', 'descentralizado'],
    ogImage: '/og-image.svg',
    ogType: 'website',
  },
  pesquisa: {
    title: 'Pesquisa e Cadastro - Fristad',
    description: 'Cadastre-se para receber novidades sobre a Fristad. Seja um dos primeiros a participar da nossa plataforma de moradia sem fronteiras.',
    keywords: ['cadastro', 'newsletter', 'early access'],
    ogImage: '/og-image.svg',
    ogType: 'website',
  },
  obrigado: {
    title: 'Obrigado - Fristad',
    description: 'Obrigado por se cadastrar! Em breve você receberá novidades sobre a Fristad.',
    ogImage: '/og-image.svg',
    ogType: 'website',
  },
  'como-funciona': {
    title: 'Como Funciona - Fristad',
    description: 'Descubra como a Fristad revoluciona a moradia temporária com tecnologia descentralizada. Conectamos anfitriões e nômades de forma direta e segura.',
    keywords: ['como funciona', 'tutorial', 'guia', 'plataforma descentralizada'],
    ogImage: '/og-image.svg',
    ogType: 'article',
  },
  hospedes: {
    title: 'Para Hóspedes - Fristad',
    description: 'Encontre acomodações autênticas ao redor do mundo. Conecte-se diretamente com anfitriões locais e viva experiências únicas sem intermediários.',
    keywords: ['hospedagem', 'viagem', 'acomodação', 'nômade digital', 'hóspedes'],
    ogImage: '/og-image.svg',
    ogType: 'website',
  },
  sobre: {
    title: 'Sobre - Fristad',
    description: 'A Fristad é uma plataforma descentralizada que reimagina a moradia temporária. Nossa missão é conectar pessoas sem intermediários, com transparência e autonomia.',
    keywords: ['sobre', 'missão', 'visão', 'equipe', 'história'],
    ogImage: '/og-image.svg',
    ogType: 'article',
  },
  // Placeholder pages (not yet implemented)
  anfitrioes: {
    title: 'Para Anfitriões - Fristad',
    description: 'Esta página será implementada em breve.',
    ogImage: '/og-image.svg',
    ogType: 'website',
  },
  arbitragem: {
    title: 'Arbitragem - Fristad',
    description: 'Esta página será implementada em breve.',
    ogImage: '/og-image.svg',
    ogType: 'website',
  },
  hubs: {
    title: 'Hubs Piloto - Fristad',
    description: 'Esta página será implementada em breve.',
    ogImage: '/og-image.svg',
    ogType: 'website',
  },
  faq: {
    title: 'Perguntas Frequentes - Fristad',
    description: 'Esta página será implementada em breve.',
    ogImage: '/og-image.svg',
    ogType: 'website',
  },
  contato: {
    title: 'Contato - Fristad',
    description: 'Esta página será implementada em breve.',
    ogImage: '/og-image.svg',
    ogType: 'website',
  },
  legal: {
    title: 'Termos de Uso - Fristad',
    description: 'Esta página será implementada em breve.',
    ogImage: '/og-image.svg',
    ogType: 'website',
  },
  privacidade: {
    title: 'Política de Privacidade - Fristad',
    description: 'Esta página será implementada em breve.',
    ogImage: '/og-image.svg',
    ogType: 'website',
  },
};

export function getPageMetadata(page: string): PageMetadata {
  return pageMetadata[page] || pageMetadata.home;
}

