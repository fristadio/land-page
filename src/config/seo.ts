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
  anfitrioes: {
    title: 'Para Anfitriões - Fristad',
    description: 'Compartilhe sua propriedade com autonomia completa. Defina suas regras, preços e condições. Receba pagamentos diretos sem taxas abusivas.',
    keywords: ['anfitrião', 'alugar', 'propriedade', 'renda extra', 'hospedagem'],
    ogImage: '/og-image.svg',
    ogType: 'website',
  },
  arbitragem: {
    title: 'Arbitragem - Fristad',
    description: 'Sistema de mediação independente para resolução justa de conflitos entre anfitriões e hóspedes. Transparência e imparcialidade garantidas.',
    keywords: ['arbitragem', 'mediação', 'conflitos', 'resolução'],
    ogImage: '/og-image.svg',
    ogType: 'article',
  },
  hubs: {
    title: 'Hubs Piloto - Fristad',
    description: 'Conheça as cidades onde a Fristad está ativa. Comunidades vibrantes de nômades digitais e anfitriões ao redor do mundo.',
    keywords: ['cidades', 'hubs', 'destinos', 'locais'],
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
  faq: {
    title: 'Perguntas Frequentes - Fristad',
    description: 'Respostas para as dúvidas mais comuns sobre a Fristad. Saiba como funciona nossa plataforma, taxas, segurança e muito mais.',
    keywords: ['faq', 'perguntas', 'ajuda', 'suporte', 'dúvidas'],
    ogImage: '/og-image.svg',
    ogType: 'article',
  },
  contato: {
    title: 'Contato - Fristad',
    description: 'Entre em contato conosco para dúvidas, suporte ou parcerias. Estamos aqui para ajudar você a aproveitar ao máximo a Fristad.',
    keywords: ['contato', 'suporte', 'ajuda', 'email'],
    ogImage: '/og-image.svg',
    ogType: 'website',
  },
  legal: {
    title: 'Termos de Uso - Fristad',
    description: 'Termos legais e condições de uso da plataforma Fristad. Conheça seus direitos e responsabilidades ao usar nossos serviços.',
    keywords: ['termos', 'legal', 'condições', 'uso'],
    ogImage: '/og-image.svg',
    ogType: 'article',
  },
  privacidade: {
    title: 'Política de Privacidade - Fristad',
    description: 'Como protegemos e utilizamos seus dados pessoais. Transparência total sobre coleta, uso e proteção de informações na Fristad.',
    keywords: ['privacidade', 'dados', 'lgpd', 'proteção'],
    ogImage: '/og-image.svg',
    ogType: 'article',
  },
};

export function getPageMetadata(page: string): PageMetadata {
  return pageMetadata[page] || pageMetadata.home;
}

