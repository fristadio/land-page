import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, Moon, Sun, MapPin, Home, Calendar, User, ExternalLink } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { FristadLogo } from "../FristadLogo";
import { MultiStepProgress } from "../MultiStepProgress";
import { CityAutocomplete } from "../CityAutocomplete";
import { dict, getLang, setLang, type Lang } from "../../i18n";
import { PrivacyPolicyModal } from "../PrivacyPolicyModal";
import { postInterest } from "../../lib/api";

type AccommodationType = 'private_room' | 'apartment_studio' | 'apartment_1_2br' | 'house' | 'coliving' | '';
type Budget = 'under_500' | '500-1000' | '1000-1500' | '1500-2000' | '2000-3000' | 'over_3000' | '';
type Duration = '1-month' | '2-3-months' | '3-6-months' | '6-12-months' | '1-year-plus' | 'flexible' | '';

export function PesquisaPage() {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);
  const [lang, setLangState] = useState<Lang>('pt');
  const [currentStep, setCurrentStep] = useState(1);
  
  useEffect(() => {
    const stored = localStorage.getItem('fristad-theme');
    if (stored === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
    setLangState(getLang());
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('fristad-theme', !isDark ? 'dark' : 'light');
  };

  const toggleLang = () => {
    const next = lang === 'pt' ? 'en' : 'pt';
    setLang(next);
    setLangState(next);
  };

  // Step 1: Cities
  const [cities, setCities] = useState<string[]>([]);

  // Step 2: Needs & Accommodation
  const [needs, setNeeds] = useState<string[]>([]);
  const [accommodationType, setAccommodationType] = useState<AccommodationType>('');

  // Step 3: Logistics
  const [budget, setBudget] = useState<Budget>('');
  const [duration, setDuration] = useState<Duration>('');
  const [startDate, setStartDate] = useState("");

  // Step 4: Profile
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [languages, setLanguages] = useState<string[]>([]);
  const [bio, setBio] = useState("");
  const [nostr, setNostr] = useState("");
  const [consent, setConsent] = useState(false);

  // UI States
  const [policyOpen, setPolicyOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Translations (temporary - will be moved to i18n)
  const t = {
    pt: {
      steps: ['Destinos', 'Estilo de Vida', 'Logística', 'Seu Perfil'],
      step1: {
        title: 'Onde você quer viver?',
        subtitle: 'Selecione até 5 cidades que você gostaria de explorar',
      },
      step2: {
        title: 'O que você precisa?',
        subtitle: 'Escolha as necessidades mais importantes para você',
        needs: {
          wifi_fast: 'WiFi rápido (100+ Mbps)',
          workspace: 'Workspace dedicado',
          community: 'Comunidade de nômades',
          quiet: 'Silêncio e privacidade',
          gym: 'Academia/Fitness',
          kitchen: 'Cozinha equipada',
          laundry: 'Lavanderia',
          pets: 'Animais permitidos',
        },
        accommodation: {
          title: 'Tipo de acomodação preferida',
          private_room: 'Quarto privado (casa compartilhada)',
          apartment_studio: 'Apartamento inteiro (studio)',
          apartment_1_2br: 'Apartamento 1-2 quartos',
          house: 'Casa inteira',
          coliving: 'Coliving/Apart-hotel',
        },
      },
      step3: {
        title: 'Detalhes práticos',
        subtitle: 'Nos ajude a entender suas necessidades',
        budget: {
          title: 'Orçamento mensal',
          under_500: 'Menos de $500',
          '500-1000': '$500 - $1000',
          '1000-1500': '$1000 - $1500',
          '1500-2000': '$1500 - $2000',
          '2000-3000': '$2000 - $3000',
          over_3000: 'Mais de $3000',
        },
        duration: {
          title: 'Duração da estadia',
          '1-month': '1 mês',
          '2-3-months': '2-3 meses',
          '3-6-months': '3-6 meses',
          '6-12-months': '6-12 meses',
          '1-year-plus': '1+ ano',
          flexible: 'Flexível',
        },
        startDate: {
          title: 'Quando você quer começar?',
          placeholder: 'Ex: Março 2025 ou 2025-03',
        },
      },
      step4: {
        title: 'Quem é você?',
        subtitle: 'Últimos detalhes para personalizarmos sua experiência',
        name: 'Nome completo',
        email: 'Seu melhor email',
        languages: {
          title: 'Idiomas que você fala',
          pt: 'Português',
          en: 'Inglês',
          es: 'Espanhol',
          fr: 'Francês',
          de: 'Alemão',
          it: 'Italiano',
          other: 'Outros',
        },
        bio: {
          title: 'Conte um pouco sobre você',
          placeholder: 'Seu trabalho, estilo de vida, interesses... (opcional, máx 280 caracteres)',
        },
        nostr: {
          title: 'Chave Nostr (opcional)',
          placeholder: 'npub1...',
          help: 'Ainda não tem? Crie sua identidade descentralizada',
          createButton: 'Criar conta Nostr',
        },
        consent: 'Concordo em receber comunicações da Fristad e aceito a',
        privacy: 'política de privacidade',
      },
      buttons: {
        next: 'Próximo',
        back: 'Voltar',
        submit: 'Enviar e receber acesso prioritário',
      },
      validation: {
        step1: 'Selecione pelo menos 1 cidade',
        step2needs: 'Selecione pelo menos 1 necessidade',
        step2accommodation: 'Escolha um tipo de acomodação',
        step3budget: 'Selecione um orçamento',
        step3duration: 'Selecione a duração da estadia',
        step4name: 'Digite seu nome',
        step4email: 'Digite um email válido',
        step4languages: 'Selecione pelo menos 1 idioma',
        step4consent: 'Você precisa concordar com a política de privacidade',
      },
    },
    en: {
      steps: ['Destinations', 'Lifestyle', 'Logistics', 'Your Profile'],
      step1: {
        title: 'Where do you want to live?',
        subtitle: 'Select up to 5 cities you\'d like to explore',
      },
      step2: {
        title: 'What do you need?',
        subtitle: 'Choose the most important amenities for you',
        needs: {
          wifi_fast: 'Fast WiFi (100+ Mbps)',
          workspace: 'Dedicated workspace',
          community: 'Nomad community',
          quiet: 'Quiet & privacy',
          gym: 'Gym/Fitness',
          kitchen: 'Equipped kitchen',
          laundry: 'Laundry',
          pets: 'Pets allowed',
        },
        accommodation: {
          title: 'Preferred accommodation type',
          private_room: 'Private room (shared house)',
          apartment_studio: 'Entire apartment (studio)',
          apartment_1_2br: 'Apartment 1-2 bedrooms',
          house: 'Entire house',
          coliving: 'Coliving/Apart-hotel',
        },
      },
      step3: {
        title: 'Practical details',
        subtitle: 'Help us understand your needs',
        budget: {
          title: 'Monthly budget',
          under_500: 'Under $500',
          '500-1000': '$500 - $1000',
          '1000-1500': '$1000 - $1500',
          '1500-2000': '$1500 - $2000',
          '2000-3000': '$2000 - $3000',
          over_3000: 'Over $3000',
        },
        duration: {
          title: 'Stay duration',
          '1-month': '1 month',
          '2-3-months': '2-3 months',
          '3-6-months': '3-6 months',
          '6-12-months': '6-12 months',
          '1-year-plus': '1+ year',
          flexible: 'Flexible',
        },
        startDate: {
          title: 'When do you want to start?',
          placeholder: 'E.g.: March 2025 or 2025-03',
        },
      },
      step4: {
        title: 'Who are you?',
        subtitle: 'Final details to personalize your experience',
        name: 'Full name',
        email: 'Your best email',
        languages: {
          title: 'Languages you speak',
          pt: 'Portuguese',
          en: 'English',
          es: 'Spanish',
          fr: 'French',
          de: 'German',
          it: 'Italian',
          other: 'Other',
        },
        bio: {
          title: 'Tell us about yourself',
          placeholder: 'Your work, lifestyle, interests... (optional, max 280 chars)',
        },
        nostr: {
          title: 'Nostr key (optional)',
          placeholder: 'npub1...',
          help: 'Don\'t have one? Create your decentralized identity',
          createButton: 'Create Nostr account',
        },
        consent: 'I agree to receive communications from Fristad and accept the',
        privacy: 'privacy policy',
      },
      buttons: {
        next: 'Next',
        back: 'Back',
        submit: 'Submit and get priority access',
      },
      validation: {
        step1: 'Select at least 1 city',
        step2needs: 'Select at least 1 need',
        step2accommodation: 'Choose an accommodation type',
        step3budget: 'Select a budget',
        step3duration: 'Select stay duration',
        step4name: 'Enter your name',
        step4email: 'Enter a valid email',
        step4languages: 'Select at least 1 language',
        step4consent: 'You must agree to the privacy policy',
      },
    },
  };

  const tt = t[lang];

  // Toggle need selection
  const toggleNeed = (need: string) => {
    if (needs.includes(need)) {
      setNeeds(needs.filter(n => n !== need));
    } else {
      setNeeds([...needs, need]);
    }
  };

  // Toggle language selection
  const toggleLanguage = (language: string) => {
    if (languages.includes(language)) {
      setLanguages(languages.filter(l => l !== language));
    } else {
      setLanguages([...languages, language]);
    }
  };

  // Validation per step
  const canProceed = (): boolean => {
    switch (currentStep) {
      case 1:
        return cities.length > 0;
      case 2:
        return needs.length > 0 && accommodationType !== '';
      case 3:
        return budget !== '' && duration !== '';
      case 4:
        return name.trim() !== '' && email.includes('@') && languages.length > 0 && consent;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (canProceed()) {
      setCurrentStep(currentStep + 1);
      setError(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Show validation error
      if (currentStep === 1 && cities.length === 0) setError(tt.validation.step1);
      if (currentStep === 2) {
        if (needs.length === 0) setError(tt.validation.step2needs);
        else if (accommodationType === '') setError(tt.validation.step2accommodation);
      }
      if (currentStep === 3) {
        if (budget === '') setError(tt.validation.step3budget);
        else if (duration === '') setError(tt.validation.step3duration);
      }
      if (currentStep === 4) {
        if (name.trim() === '') setError(tt.validation.step4name);
        else if (!email.includes('@')) setError(tt.validation.step4email);
        else if (languages.length === 0) setError(tt.validation.step4languages);
        else if (!consent) setError(tt.validation.step4consent);
      }
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    if (!canProceed()) {
      setError(tt.validation.step4consent);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await postInterest({
        persona: 'nomade',
        email,
        name,
        nostr: nostr || undefined,
        cities,
        needs,
        accommodationType,
        budget,
        duration,
        startDate: startDate || undefined,
        languages,
        bio: bio || undefined,
        consent,
      });
      navigate('/obrigado');
    } catch (err: any) {
      setError(err?.message || 'Erro ao enviar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 pt-20 pb-16 min-h-screen">
      <div className="max-w-3xl mx-auto">
        {/* Header with controls */}
        <div className="flex justify-end mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="p-2"
            aria-label="Alternar tema"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleLang}
            className="ml-2"
            aria-label="Alternar idioma"
          >
            {lang === 'pt' ? dict.pt.common.langPT : dict.en.common.langEN}
          </Button>
        </div>

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <FristadLogo size="2xl" />
          </div>

          {/* Progress indicator */}
          <MultiStepProgress
            currentStep={currentStep}
            totalSteps={4}
            stepLabels={tt.steps}
          />
        </div>

        {/* Form card */}
        <Card className="p-6 sm:p-8">
          {/* Step 1: Cities */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold">{tt.step1.title}</h2>
                <p className="text-muted-foreground">{tt.step1.subtitle}</p>
              </div>

              <CityAutocomplete
                selectedCities={cities}
                onCitiesChange={setCities}
                maxCities={5}
                lang={lang}
              />
            </div>
          )}

          {/* Step 2: Needs & Accommodation */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Home className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold">{tt.step2.title}</h2>
                <p className="text-muted-foreground">{tt.step2.subtitle}</p>
              </div>

              {/* Needs checkboxes */}
              <div className="space-y-3">
                <h3 className="font-medium">{tt.step2.title}</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {Object.entries(tt.step2.needs).map(([key, label]) => (
                    <label
                      key={key}
                      className={`
                        flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all
                        ${needs.includes(key) ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}
                      `}
                    >
                      <Checkbox
                        checked={needs.includes(key)}
                        onCheckedChange={() => toggleNeed(key)}
                      />
                      <span className="text-sm">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Accommodation type */}
              <div className="space-y-3">
                <h3 className="font-medium">{tt.step2.accommodation.title}</h3>
                <div className="space-y-2">
                  {Object.entries(tt.step2.accommodation)
                    .filter(([key]) => key !== 'title')
                    .map(([key, label]) => (
                      <label
                        key={key}
                        className={`
                          flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all
                          ${accommodationType === key ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}
                        `}
                      >
                        <input
                          type="radio"
                          name="accommodation"
                          value={key}
                          checked={accommodationType === key}
                          onChange={(e) => setAccommodationType(e.target.value as AccommodationType)}
                          className="w-4 h-4 text-primary"
                        />
                        <span className="text-sm">{label}</span>
                      </label>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Logistics */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold">{tt.step3.title}</h2>
                <p className="text-muted-foreground">{tt.step3.subtitle}</p>
              </div>

              {/* Budget */}
              <div className="space-y-3">
                <h3 className="font-medium">{tt.step3.budget.title}</h3>
                <div className="grid sm:grid-cols-2 gap-2">
                  {Object.entries(tt.step3.budget)
                    .filter(([key]) => key !== 'title')
                    .map(([key, label]) => (
                      <Button
                        key={key}
                        type="button"
                        variant={budget === key ? 'default' : 'outline'}
                        onClick={() => setBudget(key as Budget)}
                        className="w-full"
                      >
                        {label}
                      </Button>
                    ))}
                </div>
              </div>

              {/* Duration */}
              <div className="space-y-3">
                <h3 className="font-medium">{tt.step3.duration.title}</h3>
                <div className="grid sm:grid-cols-2 gap-2">
                  {Object.entries(tt.step3.duration)
                    .filter(([key]) => key !== 'title')
                    .map(([key, label]) => (
                      <Button
                        key={key}
                        type="button"
                        variant={duration === key ? 'default' : 'outline'}
                        onClick={() => setDuration(key as Duration)}
                        className="w-full"
                      >
                        {label}
                      </Button>
                    ))}
                </div>
              </div>

              {/* Start Date */}
              <div className="space-y-3">
                <h3 className="font-medium">{tt.step3.startDate.title}</h3>
                <Input
                  type="text"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  placeholder={tt.step3.startDate.placeholder}
                />
                <p className="text-xs text-muted-foreground">
                  {lang === 'pt' ? 'Opcional - formato livre' : 'Optional - free format'}
                </p>
              </div>
            </div>
          )}

          {/* Step 4: Profile */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold">{tt.step4.title}</h2>
                <p className="text-muted-foreground">{tt.step4.subtitle}</p>
              </div>

              <div className="space-y-4">
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={tt.step4.name}
                  required
                />

                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={tt.step4.email}
                  required
                />

                {/* Languages */}
                <div className="space-y-3">
                  <h3 className="font-medium">{tt.step4.languages.title}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {Object.entries(tt.step4.languages)
                      .filter(([key]) => key !== 'title')
                      .map(([key, label]) => (
                        <Button
                          key={key}
                          type="button"
                          variant={languages.includes(key) ? 'default' : 'outline'}
                          onClick={() => toggleLanguage(key)}
                          size="sm"
                          className="w-full"
                        >
                          {label}
                        </Button>
                      ))}
                  </div>
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">{tt.step4.bio.title}</label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value.slice(0, 280))}
                    placeholder={tt.step4.bio.placeholder}
                    className="w-full min-h-[100px] px-3 py-2 border rounded-md resize-none"
                    maxLength={280}
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    {bio.length}/280
                  </p>
                </div>

                {/* Nostr */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">{tt.step4.nostr.title}</label>
                  <Input
                    type="text"
                    value={nostr}
                    onChange={(e) => setNostr(e.target.value)}
                    placeholder={tt.step4.nostr.placeholder}
                  />
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{tt.step4.nostr.help}</span>
                    <a
                      href="https://nostr.how/en/get-started"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:underline"
                    >
                      {tt.step4.nostr.createButton}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Consent */}
                <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                  <Checkbox
                    id="consent"
                    checked={consent}
                    onCheckedChange={(checked) => setConsent(checked as boolean)}
                  />
                  <label htmlFor="consent" className="text-sm leading-relaxed cursor-pointer">
                    {tt.step4.consent}{' '}
                    <button
                      type="button"
                      onClick={() => setPolicyOpen(true)}
                      className="text-primary hover:underline"
                    >
                      {tt.step4.privacy}
                    </button>
                    .
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="mt-6 p-4 bg-destructive/10 text-destructive rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Navigation buttons */}
          <div className="mt-8 flex gap-3">
            {currentStep > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                {tt.buttons.back}
              </Button>
            )}

            <div className="flex-1" />

            {currentStep < 4 ? (
              <Button
                type="button"
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex items-center gap-2"
              >
                {tt.buttons.next}
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={!canProceed() || loading}
                className="flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    {lang === 'pt' ? 'Enviando...' : 'Sending...'}
                  </>
                ) : (
                  <>
                    {tt.buttons.submit}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        </Card>
      </div>

      <PrivacyPolicyModal open={policyOpen} onOpenChange={setPolicyOpen} />
    </section>
  );
}
