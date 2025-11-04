import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { FristadLogo } from "../FristadLogo";
import { dict, getLang, setLang, type Lang } from "../../i18n";

interface HomePageProps {
  persona: 'anfitriao' | 'nomade' | '';
  setPersona: (persona: 'anfitriao' | 'nomade' | '') => void;
}

export function HomePage({ persona, setPersona }: HomePageProps) {
  const [isDark, setIsDark] = useState(false);
  const [lang, setLangState] = useState<Lang>('pt');

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

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 pb-16 min-h-screen flex items-center">
      <div className="max-w-3xl mx-auto w-full">
        <div className="flex justify-end">
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
        <div className="text-center space-y-8">
          <div className="flex justify-center">
            <FristadLogo size="2xl" />
          </div>
          <div className="space-y-4">
            <h1 className="display-1">{lang === 'pt' ? dict.pt.home.title : dict.en.home.title}</h1>
            <p className="text-xl text-muted-foreground">
              {lang === 'pt' ? dict.pt.home.subtitle : dict.en.home.subtitle}
            </p>
          </div>

          <Card className="p-8 space-y-6">
            <div className="space-y-2">
              <h2>{lang === 'pt' ? dict.pt.home.who : dict.en.home.who}</h2>
              <p className="text-sm text-muted-foreground">{lang === 'pt' ? 'Selecione a persona que melhor descreve você' : 'Select the persona that best describes you'}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <Button
                type="button"
                variant={persona === 'anfitriao' ? 'default' : 'outline'}
                onClick={() => setPersona('anfitriao')}
                className="w-full"
              >
                {lang === 'pt' ? dict.pt.home.persona.host : dict.en.home.persona.host}
              </Button>
              <Button
                type="button"
                variant={persona === 'nomade' ? 'default' : 'outline'}
                onClick={() => setPersona('nomade')}
                className="w-full"
              >
                {lang === 'pt' ? dict.pt.home.persona.nomad : dict.en.home.persona.nomad}
              </Button>
            </div>

            <div className="pt-2">
              <Link to="/pesquisa">
                <Button size="lg" className="w-full">
                {lang === 'pt' ? dict.pt.home.ctaGo : dict.en.home.ctaGo}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              </Link>
              <p className="text-xs text-muted-foreground mt-3">
                {lang === 'pt' ? dict.pt.home.ctaNote : dict.en.home.ctaNote}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}