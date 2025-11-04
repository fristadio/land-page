import { Link } from "react-router-dom";
import { useState } from "react";
import { CheckCircle, ArrowRight, MapPin, Clock, Shield, Star, Calendar, Users, Home } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";

interface HospedesPageProps {
}

export function HospedesPage() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && consent) {
      alert('Cadastro realizado! Entraremos em contato em breve.');
      setEmail('');
      setConsent(false);
    }
  };

  const beneficios = [
    {
      icone: <MapPin className="w-6 h-6" />,
      titulo: "Liberdade de Escolha",
      descricao: "Encontre estadias em destinos nórdicos premium sem intermediários desnecessários",
      detalhes: ["Copenhague, Estocolmo, Oslo", "Lisboa em breve", "Propriedades verificadas"]
    },
    {
      icone: <Clock className="w-6 h-6" />,
      titulo: "Estadias Flexíveis", 
      descricao: "Períodos de 1 a 6 meses adaptados às suas necessidades específicas",
      detalhes: ["Datas negociáveis", "Extensões possíveis", "Check-in facilitado"]
    },
    {
      icone: <Shield className="w-6 h-6" />,
      titulo: "Proteção Garantida",
      descricao: "Arbitragem independente e acordos registrados para sua segurança",
      detalhes: ["Árbitro neutro", "Termos imutáveis", "Suporte dedicado"]
    }
  ];

  const processo = [
    {
      numero: "1",
      titulo: "Cadastre-se",
      descricao: "Complete seu perfil com informações verificadas"
    },
    {
      numero: "2", 
      titulo: "Busque",
      descricao: "Explore propriedades nos hubs piloto disponíveis"
    },
    {
      numero: "3",
      titulo: "Conecte-se",
      descricao: "Converse diretamente com anfitriões compatíveis"
    },
    {
      numero: "4",
      titulo: "Acorde",
      descricao: "Negocie termos personalizados com transparência total"
    },
    {
      numero: "5",
      titulo: "Proteja-se", 
      descricao: "Registre o acordo com arbitragem independente"
    }
  ];

  const testimonials = [
    {
      nome: "Ana M.",
      origem: "Lisboa",
      destino: "Estocolmo", 
      duracao: "3 meses",
      depoimento: "Encontrei o apartamento perfeito para meu intercâmbio. O processo foi transparente e me senti segura durante toda a negociação.",
      rating: 5
    },
    {
      nome: "Pedro R.",
      origem: "São Paulo", 
      destino: "Copenhague",
      duracao: "4 meses",
      depoimento: "Consegui um preço justo negociando diretamente com o anfitrião. Sem taxas abusivas, só um acordo honesto.",
      rating: 5
    }
  ];

  const criterios = [
    {
      categoria: "Perfil Verificado",
      itens: ["Identidade confirmada", "Referências profissionais", "Histórico de moradia", "Avaliação de compatibilidade"]
    },
    {
      categoria: "Capacidade Financeira", 
      itens: ["Comprovação de renda", "Histórico creditício", "Capacidade de pagamento", "Garantias adequadas"]
    },
    {
      categoria: "Expectativas Alinhadas",
      itens: ["Duração compatível", "Estilo de vida similar", "Preferências respeitadas", "Comunicação clara"]
    }
  ];

  return (
    <div className="space-y-24">
      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Badge variant="secondary">Para Hóspedes</Badge>
          <h1>Encontre Sua Próxima Casa</h1>
          <p className="text-xl text-muted-foreground">
            Conecte-se diretamente com anfitriões verificados para estadias de médio prazo 
            em destinos nórdicos premium. Autonomia, transparência e proteção garantida.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              Quero participar
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Link to="/como-funciona"><Button size="lg" variant="outline" >
              Como funciona
            </Button></Link>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2>Vantagens Para Hóspedes</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experiência de moradia projetada para sua autonomia e segurança
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {beneficios.map((beneficio, index) => (
              <Card key={index} className="p-8 space-y-6 text-center group hover:shadow-lg transition-all">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {beneficio.icone}
                </div>
                <div className="space-y-4">
                  <h3>{beneficio.titulo}</h3>
                  <p className="text-muted-foreground">{beneficio.descricao}</p>
                  <ul className="space-y-2">
                    {beneficio.detalhes.map((detalhe, idx) => (
                      <li key={idx} className="flex items-center justify-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-success" />
                        {detalhe}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Processo */}
      <section className="px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto py-20">
          <div className="text-center mb-16">
            <h2>Como Participar</h2>
            <p className="text-lg text-muted-foreground">
              Processo simples em 5 passos para sua próxima experiência de moradia
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {processo.map((passo, index) => (
              <Card key={index} className="p-6 text-center space-y-4 relative">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto text-primary-foreground font-bold">
                  {passo.numero}
                </div>
                <div className="space-y-2">
                  <h4>{passo.titulo}</h4>
                  <p className="text-sm text-muted-foreground">{passo.descricao}</p>
                </div>
                {index < processo.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Critérios */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2>Critérios de Participação</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Requisitos transparentes para garantir experiências positivas para todos
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {criterios.map((criterio, index) => (
              <Card key={index} className="p-8 space-y-6">
                <h3>{criterio.categoria}</h3>
                <ul className="space-y-3">
                  {criterio.itens.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 inline-block">
              <div className="space-y-4">
                <h4>Suporte Personalizado</h4>
                <p className="text-muted-foreground max-w-md">
                  Nossa equipe te acompanha durante todo o processo, desde a busca inicial 
                  até a finalização do acordo.
                </p>
                <Link to="/contato"><Button variant="outline" >
                  Fale conosco
                </Button></Link>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto py-20">
          <div className="text-center mb-16">
            <h2>Experiências Reais</h2>
            <p className="text-lg text-muted-foreground">
              Histórias de hóspedes que já viveram a experiência Fristad
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8 space-y-6">
                <div className="flex items-center gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-fristad-gold-500 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-lg italic text-muted-foreground">
                  "{testimonial.depoimento}"
                </blockquote>
                
                <div className="space-y-2">
                  <div className="font-medium">{testimonial.nome}</div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {testimonial.origem} → {testimonial.destino}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {testimonial.duracao}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Rápido */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2>Dúvidas Frequentes</h2>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <div className="space-y-3">
                <h4>Qual o período mínimo e máximo de estadia?</h4>
                <p className="text-muted-foreground">
                  Trabalhamos com estadias de 1 a 6 meses, ideais para intercâmbios, trabalho remoto, 
                  relocação temporária ou exploração de novos destinos.
                </p>
              </div>
            </Card>

            <Card className="p-6">
              <div className="space-y-3">
                <h4>Como funciona a proteção do acordo?</h4>
                <p className="text-muted-foreground">
                  Todo acordo é registrado de forma imutável e conta com um árbitro independente 
                  designado para resolver eventuais conflitos de forma justa e eficiente.
                </p>
              </div>
            </Card>

            <Card className="p-6">
              <div className="space-y-3">
                <h4>Quais taxas são cobradas?</h4>
                <p className="text-muted-foreground">
                  Cobramos apenas uma taxa de serviço transparente ao final do processo. 
                  Não há taxas ocultas ou custos surpresa durante a negociação.
                </p>
              </div>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Link to="/faq"><Button variant="outline" >
              Ver todas as perguntas
            </Button></Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="p-12 text-center space-y-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
            <div className="space-y-4">
              <h2>Comece Sua Jornada</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Cadastre-se para receber acesso prioritário aos hubs piloto e 
                descobrir oportunidades exclusivas de moradia.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
              <Input
                type="email"
                placeholder="Seu melhor email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="text-center"
              />

              <div className="flex items-start space-x-2 text-left">
                <Checkbox
                  id="consent-hospedes"
                  checked={consent}
                  onCheckedChange={(checked) => setConsent(checked as boolean)}
                  required
                />
                <label htmlFor="consent-hospedes" className="text-sm text-muted-foreground leading-relaxed">
                  Concordo em receber comunicações da Fristad e aceito a{' '}
                  <button 
                    type="button"
                    to="/privacidade"
                    className="text-primary hover:underline"
                  >
                    política de privacidade
                  </button>
                </label>
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full"
                disabled={!email || !consent}
              >
                Quero participar como hóspede
              </Button>

              <p className="text-xs text-muted-foreground">
                Acesso prioritário aos hubs piloto • Sem spam • Dados protegidos
              </p>
            </form>
          </Card>
        </div>
      </section>
    </div>
  );
}