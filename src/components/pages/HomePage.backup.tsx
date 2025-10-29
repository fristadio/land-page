import { useState } from "react";
import { CheckCircle, ArrowRight, Users, Shield, Home, Clock, MapPin, Star } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "../ui/badge";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [userType, setUserType] = useState<'guest' | 'host' | ''>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && consent) {
      // Simular envio
      alert('Obrigado pelo interesse! Entraremos em contato em breve.');
      setEmail('');
      setConsent(false);
      setUserType('');
    }
  };

  const steps = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Conexão Direta",
      description: "Hóspedes e anfitriões se conectam sem intermediários, criando acordos personalizados para estadias de médio prazo."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Arbitragem Independente",
      description: "Árbitros neutros garantem a resolução justa de conflitos, protegendo ambas as partes com total imparcialidade."
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Acordo Seguro",
      description: "Termos claros e transparentes registrados de forma imutável, garantindo previsibilidade e confiança mútua."
    }
  ];

  const benefits = [
    {
      icon: <Home className="w-8 h-8" />,
      title: "Para Hóspedes",
      description: "Encontre estadias de 1-6 meses com flexibilidade total",
      features: ["Acordos personalizados", "Preços transparentes", "Proteção garantida"],
      cta: "Quero participar",
      action: () => onNavigate('hospedes')
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Para Anfitriões", 
      description: "Disponibilize sua propriedade com autonomia completa",
      features: ["Renda previsível", "Controle total", "Suporte especializado"],
      cta: "Quero hospedar",
      action: () => onNavigate('anfitrioes')
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Para Árbitros",
      description: "Contribua como mediador independente qualificado",
      features: ["Remuneração justa", "Casos relevantes", "Impacto social"],
      cta: "Saiba mais",
      action: () => onNavigate('arbitragem')
    }
  ];

  const testimonials = [
    {
      name: "Ana M.",
      role: "Hóspede",
      content: "Encontrei o apartamento perfeito em Estocolmo por 3 meses. O processo foi transparente e seguro do início ao fim.",
      rating: 5,
      location: "Lisboa → Estocolmo"
    },
    {
      name: "Lars K.",
      role: "Anfitrião",
      content: "Finalmente uma plataforma que me dá controle total sobre minha propriedade. Sem taxas abusivas, só acordos justos.",
      rating: 5,
      location: "Copenhague"
    },
    {
      name: "Sofia R.",
      role: "Árbitra",
      content: "Como mediadora, aprecia a transparência do processo. Consigo resolver conflitos de forma justa e eficiente.",
      rating: 5,
      location: "Oslo"
    }
  ];

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            <div className="space-y-6">
              <Badge variant="secondary" className="text-sm px-4 py-2">
                Beta • Hubs Piloto Ativos
              </Badge>
              <h1 className="display-1 max-w-4xl mx-auto">
                Moradia Sem Fronteiras
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Conectamos pessoas para estadias de médio prazo através de acordos privados diretos. 
                Autonomia, confiança e simplicidade em cada transação.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => onNavigate('hospedes')}
                className="min-w-[200px]"
              >
                Quero participar
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => onNavigate('como-funciona')}
                className="min-w-[200px]"
              >
                Como funciona
              </Button>
            </div>

            <div className="pt-8 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Disponível nos Hubs Piloto
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  Copenhague
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  Estocolmo
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  Oslo
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-warning rounded-full"></div>
                  Lisboa
                  <span className="text-xs text-muted-foreground">(em breve)</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2>Como Funciona</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Um processo simples e transparente em três passos fundamentais
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="p-8 text-center space-y-6 relative">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto text-primary">
                  {step.icon}
                </div>
                <div className="space-y-3">
                  <h3>{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-muted-foreground" />
                  </div>
                )}
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              onClick={() => onNavigate('como-funciona')}
            >
              Ver processo completo
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto py-20">
          <div className="text-center space-y-4 mb-16">
            <h2>Para Quem É</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Criamos soluções específicas para cada perfil de usuário
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-8 space-y-6 text-center group hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {benefit.icon}
                </div>
                <div className="space-y-4">
                  <h3>{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                  <ul className="space-y-2">
                    {benefit.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center justify-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-success" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button 
                  onClick={benefit.action}
                  className="w-full"
                  variant={index === 1 ? "default" : "outline"}
                >
                  {benefit.cta}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2>O Que Dizem Nossos Usuários</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Feedback real de pessoas que já viveram a experiência Fristad
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 space-y-4">
                <div className="flex items-center gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-fristad-gold-500 fill-current" />
                  ))}
                </div>
                <blockquote className="text-muted-foreground italic">
                  "{testimonial.content}"
                </blockquote>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{testimonial.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {testimonial.role}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.location}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="p-12 text-center space-y-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
            <div className="space-y-4">
              <h2>Pronto para Começar?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Junte-se à comunidade Fristad e descubra uma nova forma de morar. 
                Cadastre-se para receber acesso prioritário aos hubs piloto.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
              <div className="space-y-4">
                <div className="flex gap-4 justify-center">
                  <Button
                    type="button"
                    variant={userType === 'guest' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setUserType('guest')}
                  >
                    Quero participar
                  </Button>
                  <Button
                    type="button"
                    variant={userType === 'host' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setUserType('host')}
                  >
                    Quero hospedar
                  </Button>
                </div>

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
                    id="consent"
                    checked={consent}
                    onCheckedChange={(checked) => setConsent(checked as boolean)}
                    required
                  />
                  <label htmlFor="consent" className="text-sm text-muted-foreground leading-relaxed">
                    Concordo em receber comunicações da Fristad e aceito a{' '}
                    <button 
                      type="button"
                      onClick={() => onNavigate('privacidade')}
                      className="text-primary hover:underline"
                    >
                      política de privacidade
                    </button>
                  </label>
                </div>
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full"
                disabled={!email || !consent || !userType}
              >
                Garantir Acesso Prioritário
              </Button>

              <p className="text-xs text-muted-foreground">
                Lista de espera limitada • Sem spam • Dados protegidos
              </p>
            </form>
          </Card>
        </div>
      </section>
    </div>
  );
}



