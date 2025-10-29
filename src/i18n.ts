export type Lang = 'pt' | 'en';

const STORAGE_KEY = 'fristad-lang';

export function getLang(): Lang {
  if (typeof window === 'undefined') return 'pt';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'en' || stored === 'pt') return stored;
  return 'pt';
}

export function setLang(lang: Lang) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, lang);
}

export const dict = {
  pt: {
    home: {
      title: 'Moradia Sem Fronteiras',
      subtitle: 'Estamos construindo a Fristad. Participe do início respondendo uma pesquisa rápida e deixando seu contato para acesso prioritário.',
      who: 'Quem é você?',
      persona: {
        host: 'Anfitrião',
        arbitrator: 'Árbitro',
        nomad: 'Nômade',
      },
      ctaGo: 'Ir para pesquisa e cadastro',
      ctaNote: 'Formulário interno • Leva menos de 2 minutos • Sem spam',
    },
    pesquisa: {
      title: 'Formulário de Interesse',
      intro: 'Deixe seu contato e preferências para receber acesso prioritário aos hubs piloto.',
      who: 'Quem é você?',
      fields: {
        name: 'Seu nome (opcional)',
        email: 'Seu melhor email',
        nostr: 'Chave Nostr (npub...) — opcional',
        nomadCountries: 'Países/cidades de interesse (ex.: Copenhague, Estocolmo, Oslo)',
        hostTitle: 'Título curto da propriedade (ex.: Estúdio no centro)',
        hostLocation: 'Localização (cidade/país)',
        hostSummary: 'Resumo (ex.: 1 quarto, mobiliado, wi‑fi rápido)',
      },
      persona: {
        host: 'Anfitrião',
        arbitrator: 'Árbitro',
        nomad: 'Nômade',
      },
      consent: 'Concordo em receber comunicações da Fristad e aceito a',
      privacy: 'política de privacidade',
      submit: 'Enviar e receber acesso prioritário',
      note: 'Leva menos de 2 minutos • Sem spam • Dados protegidos',
    },
    obrigado: {
      title: 'Obrigado!',
      desc: 'Recebemos seu interesse. Em breve entraremos em contato com novidades e próximos passos.',
      backHome: 'Voltar para início',
      learn: 'Conhecer a Fristad',
    },
    privacyModal: {
      title: 'Política de Privacidade',
      description: 'Como protegemos e utilizamos seus dados pessoais.',
      p1: 'Coletamos apenas os dados necessários para oferecer acesso prioritário, comunicação sobre hubs piloto e evolução do produto. Não vendemos seus dados.',
      list: [
        'Dados coletados: nome (opcional), e-mail, preferências (personas e destinos).',
        'Uso: comunicação sobre disponibilidade e convites para entrevistas.',
        'Base legal: consentimento, que pode ser revogado a qualquer momento.',
        'Conservação: somente enquanto necessário para os fins informados.',
        'Segurança: práticas de minimização e acesso restrito.',
      ],
      p2: 'Para exercer seus direitos (acesso, correção, exclusão), responda qualquer e-mail nosso solicitando a ação desejada.',
    },
    common: {
      langPT: 'PT',
      langEN: 'EN',
      privacy: 'política de privacidade',
    },
  },
  en: {
    home: {
      title: 'Borderless Living',
      subtitle: 'We are building Fristad. Join early by answering a quick survey and leaving your contact for priority access.',
      who: 'Who are you?',
      persona: {
        host: 'Host',
        arbitrator: 'Arbitrator',
        nomad: 'Nomad',
      },
      ctaGo: 'Go to survey and signup',
      ctaNote: 'Internal form • Under 2 minutes • No spam',
    },
    pesquisa: {
      title: 'Interest Form',
      intro: 'Leave your contact and preferences to get priority access to pilot hubs.',
      who: 'Who are you?',
      fields: {
        name: 'Your name (optional)',
        email: 'Your best email',
        nostr: 'Nostr key (npub...) — optional',
        nomadCountries: 'Countries/cities of interest (e.g., Copenhagen, Stockholm, Oslo)',
        hostTitle: 'Property short title (e.g., Studio downtown)',
        hostLocation: 'Location (city/country)',
        hostSummary: 'Summary (e.g., 1 bedroom, furnished, fast wi‑fi)',
      },
      persona: {
        host: 'Host',
        arbitrator: 'Arbitrator',
        nomad: 'Nomad',
      },
      consent: 'I agree to receive communications from Fristad and accept the',
      privacy: 'privacy policy',
      submit: 'Submit and get priority access',
      note: 'Under 2 minutes • No spam • Data protected',
    },
    obrigado: {
      title: 'Thank you!',
      desc: 'We received your interest. We will contact you soon with updates and next steps.',
      backHome: 'Back to start',
      learn: 'Learn about Fristad',
    },
    privacyModal: {
      title: 'Privacy Policy',
      description: 'How we protect and use your personal data.',
      p1: 'We only collect the data necessary to provide priority access, communicate about pilot hubs, and improve the product. We do not sell your data.',
      list: [
        'Data collected: name (optional), email, preferences (personas and destinations).',
        'Use: communications about availability and interview invitations.',
        'Legal basis: consent, which can be withdrawn at any time.',
        'Retention: only as long as necessary for the stated purposes.',
        'Security: data minimization and restricted access practices.',
      ],
      p2: 'To exercise your rights (access, correction, deletion), reply to any of our emails requesting the desired action.',
    },
    common: {
      langPT: 'PT',
      langEN: 'EN',
      privacy: 'privacy policy',
    },
  },
} as const;


