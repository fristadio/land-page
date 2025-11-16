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
    description: 'Plataforma descentralizada de moradia temporária conectando anfitriões e nômades digitais. Cadastre-se para receber novidades e seja um dos primeiros a participar.',
    keywords: ['moradia temporária', 'nômade digital', 'hospedagem', 'aluguel temporário', 'anfitriões', 'descentralizado', 'cadastro', 'early access'],
    ogImage: '/og-image.svg',
    ogType: 'website',
  },
  obrigado: {
    title: 'Obrigado - Fristad',
    description: 'Obrigado por se cadastrar! Em breve você receberá novidades sobre a Fristad.',
    ogImage: '/og-image.svg',
    ogType: 'website',
  },
};

export function getPageMetadata(page: string): PageMetadata {
  return pageMetadata[page] || pageMetadata.home;
}

