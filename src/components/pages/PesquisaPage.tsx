import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { dict, getLang, type Lang } from "../../i18n";
import { PrivacyPolicyModal } from "../PrivacyPolicyModal";
import { postInterest } from "../../lib/api";

interface PesquisaPageProps {
  onNavigate: (page: string) => void;
}

export function PesquisaPage({ onNavigate }: PesquisaPageProps) {
  const [persona, setPersona] = useState<'anfitriao' | 'arbitro' | 'nomade' | ''>('');
  const [lang, setLangState] = useState<Lang>('pt');
  useEffect(() => setLangState(getLang()), []);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [nostr, setNostr] = useState("");
  const [paises, setPaises] = useState("");
  const [propTitulo, setPropTitulo] = useState("");
  const [propLocal, setPropLocal] = useState("");
  const [propResumo, setPropResumo] = useState("");
  const [consent, setConsent] = useState(false);
  const [policyOpen, setPolicyOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!persona || !email || !consent) return;
    setLoading(true);
    setError(null);
    try {
      await postInterest({
        persona,
        email,
        name: nome || undefined,
        nostr: nostr || undefined,
        countries: persona === 'nomade' ? (paises || undefined) : undefined,
        propertyTitle: persona === 'anfitriao' ? (propTitulo || undefined) : undefined,
        propertyLocation: persona === 'anfitriao' ? (propLocal || undefined) : undefined,
        propertySummary: persona === 'anfitriao' ? (propResumo || undefined) : undefined,
        consent,
      });
      onNavigate('obrigado');
    } catch (err: any) {
      setError(err?.message || 'Erro ao enviar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 pt-20 pb-16 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <div className="text-center space-y-6 mb-8">
          <h1>{lang === 'pt' ? dict.pt.pesquisa.title : dict.en.pesquisa.title}</h1>
          <p className="text-muted-foreground">
            {lang === 'pt' ? dict.pt.pesquisa.intro : dict.en.pesquisa.intro}
          </p>
        </div>

        <Card className="p-8 space-y-8">
          <div className="space-y-3">
            <h2>{lang === 'pt' ? dict.pt.pesquisa.who : dict.en.pesquisa.who}</h2>
            <div className="grid md:grid-cols-3 gap-3">
              <Button type="button" variant={persona === 'anfitriao' ? 'default' : 'outline'} onClick={() => setPersona('anfitriao')} className="w-full">{lang === 'pt' ? dict.pt.pesquisa.persona.host : dict.en.pesquisa.persona.host}</Button>
              <Button type="button" variant={persona === 'arbitro' ? 'default' : 'outline'} onClick={() => setPersona('arbitro')} className="w-full">{lang === 'pt' ? dict.pt.pesquisa.persona.arbitrator : dict.en.pesquisa.persona.arbitrator}</Button>
              <Button type="button" variant={persona === 'nomade' ? 'default' : 'outline'} onClick={() => setPersona('nomade')} className="w-full">{lang === 'pt' ? dict.pt.pesquisa.persona.nomad : dict.en.pesquisa.persona.nomad}</Button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4">
              <Input placeholder={lang === 'pt' ? dict.pt.pesquisa.fields.name : dict.en.pesquisa.fields.name} value={nome} onChange={(e) => setNome(e.target.value)} />
              <Input type="email" placeholder={lang === 'pt' ? dict.pt.pesquisa.fields.email : dict.en.pesquisa.fields.email} required value={email} onChange={(e) => setEmail(e.target.value)} />
              <Input placeholder={lang === 'pt' ? dict.pt.pesquisa.fields.nostr : dict.en.pesquisa.fields.nostr} value={nostr} onChange={(e) => setNostr(e.target.value)} />
            </div>

            {persona === 'nomade' && (
              <div className="space-y-3 text-left">
                <h3>Preferências de Destino</h3>
                <Input placeholder={lang === 'pt' ? dict.pt.pesquisa.fields.nomadCountries : dict.en.pesquisa.fields.nomadCountries} value={paises} onChange={(e) => setPaises(e.target.value)} />
              </div>
            )}

            {persona === 'anfitriao' && (
              <div className="space-y-3 text-left">
                <h3>Propriedade</h3>
                <Input placeholder={lang === 'pt' ? dict.pt.pesquisa.fields.hostTitle : dict.en.pesquisa.fields.hostTitle} value={propTitulo} onChange={(e) => setPropTitulo(e.target.value)} />
                <Input placeholder={lang === 'pt' ? dict.pt.pesquisa.fields.hostLocation : dict.en.pesquisa.fields.hostLocation} value={propLocal} onChange={(e) => setPropLocal(e.target.value)} />
                <Input placeholder={lang === 'pt' ? dict.pt.pesquisa.fields.hostSummary : dict.en.pesquisa.fields.hostSummary} value={propResumo} onChange={(e) => setPropResumo(e.target.value)} />
              </div>
            )}

            <div className="flex items-start space-x-2">
              <Checkbox id="consent" required checked={consent} onCheckedChange={(c) => setConsent(c as boolean)} />
              <label htmlFor="consent" className="text-sm text-muted-foreground leading-relaxed">
                {lang === 'pt' ? dict.pt.pesquisa.consent : dict.en.pesquisa.consent}{' '}
                <button type="button" onClick={() => setPolicyOpen(true)} className="text-primary hover:underline">{lang === 'pt' ? dict.pt.pesquisa.privacy : dict.en.pesquisa.privacy}</button>
              </label>
            </div>

            {error && (
              <p className="text-sm text-destructive mb-2" role="alert">{error}</p>
            )}
            <Button type="submit" size="lg" className="w-full" disabled={!persona || !email || !consent || loading}>
              {loading ? (lang === 'pt' ? 'Enviando...' : 'Sending...') : (lang === 'pt' ? dict.pt.pesquisa.submit : dict.en.pesquisa.submit)}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>

            <p className="text-xs text-muted-foreground text-center">{lang === 'pt' ? dict.pt.pesquisa.note : dict.en.pesquisa.note}</p>
          </form>
        </Card>
      </div>
      <PrivacyPolicyModal open={policyOpen} onOpenChange={setPolicyOpen} />
    </section>
  );
}


