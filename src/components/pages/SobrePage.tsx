import { Link } from "react-router-dom";
import { ArrowRight, Shield, Users, Globe, Heart, Target, CheckCircle, X } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";

interface SobrePageProps {
}

export function SobrePage() {
  const principios = [
    {
      icone: <Users className="w-8 h-8" />,
      titulo: "Autonomia",
      descricao: "Pessoas devem ter controle total sobre suas decisões de moradia, sem imposições externas ou intermediários desnecessários."
    },
    {
      icone: <Shield className="w-8 h-8" />,
      titulo: "Confiança",
      descricao: "Transparência total e proteções robustas criam o ambiente seguro necessário para acordos privados diretos."
    },
    {
      icone: <Globe className="w-8 h-8" />,
      titulo: "Simplicidade", 
      descricao: "Processos claros e diretos eliminam burocracias desnecessárias e facilitam conexões genuínas."
    },
    {
      icone: <Heart className="w-8 h-8" />,
      titulo: "Privacidade",
      descricao: "Seus dados e informações pessoais são protegidos com o mais alto padrão de segurança e minimização."
    }
  ];

  const timeline = [
    {
      ano: "2024",
      titulo: "Fundação",
      descricao: "Fristad nasce da necessidade de simplificar estadias de médio prazo em um mundo cada vez mais conectado."
    },
    {
      ano: "Q1 2024",
      titulo: "Primeiro Hub",
      descricao: "Lançamento do hub piloto em Copenhague, estabelecendo as bases do modelo de acordos privados."
    },
    {
      ano: "Q2 2024", 
      titulo: "Expansão Nórdica",
      descricao: "Ativação dos hubs de Estocolmo e Oslo, consolidando a presença nos países nórdicos."
    },
    {
      ano: "Q4 2024",
      titulo: "Portugal",
      descricao: "Preparação para lançamento do hub de Lisboa, expandindo para o mercado português."
    }
  ];

  const naoFazemos = [
    {
      titulo: "Não somos uma custódia",
      descricao: "Não guardamos seu dinheiro. Pagamentos são diretos entre as partes, garantindo total autonomia financeira.",
      icone: <X className="w-5 h-5 text-destructive" />
    },
    {
      titulo: "Não somos hotelaria",
      descricao: "Não operamos propriedades. Conectamos pessoas para acordos privados genuínos de moradia.",
      icone: <X className="w-5 h-5 text-destructive" />
    },
    {
      titulo: "Não cobramos taxas abusivas",
      descricao: "Nossa receita vem de uma taxa de serviço transparente, não de taxas ocultas ou percentuais excessivos.",
      icone: <X className="w-5 h-5 text-destructive" />
    },
    {
      titulo: "Não controlamos preços",
      descricao: "Valores são sempre negociados diretamente entre hóspedes e anfitriões, respeitando a autonomia de ambos.",
      icone: <X className="w-5 h-5 text-destructive" />
    }
  ];

  const equipe = [
    {
      nome: "Emma L.",
      cargo: "Co-fundadora",
      bio: "15 anos em tecnologia e habitação sustentável. Viveu em 8 países diferentes.",
      especialidade: "Produto & Estratégia"
    },
    {
      nome: "Magnus K.", 
      cargo: "Co-fundador",
      bio: "Especialista em arbitragem internacional e contratos privados.",
      especialidade: "Legal & Operações"
    },
    {
      nome: "Sofia R.",
      cargo: "Árbitra Principal",
      bio: "Mediadora certificada com foco em resolução de conflitos de moradia.",
      especialidade: "Arbitragem & Compliance"
    }
  ];

  return (
    <div className="space-y-24">
      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Badge variant="secondary">Nossa História</Badge>
          <h1>Sobre a Fristad</h1>
          <p className="text-xl text-muted-foreground">
            Nascemos para simplificar a moradia sem fronteiras através de acordos privados diretos. 
            Nossa missão é conectar pessoas com autonomia, confiança e transparência total.
          </p>
        </div>
      </section>

      {/* Missão */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <h2>Nossa Missão</h2>
                <p className="text-lg text-muted-foreground">
                  Democratizar o acesso à moradia de qualidade para estadias de médio prazo, 
                  eliminando barreiras e intermediários desnecessários.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4>Visão</h4>
                    <p className="text-sm text-muted-foreground">
                      Um mundo onde qualquer pessoa pode morar temporariamente em qualquer lugar 
                      através de acordos privados justos e transparentes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Globe className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4>Impacto</h4>
                    <p className="text-sm text-muted-foreground">
                      Facilitar a mobilidade global para trabalho, estudos e exploração cultural, 
                      respeitando as comunidades locais.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="p-8">
              <div className="space-y-6">
                <h4>Por que "Fristad"?</h4>
                <div className="space-y-4 text-sm text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Fristad</strong> é uma palavra nórdica que significa 
                    "lugar de refúgio" ou "santuário" - um espaço seguro onde se pode encontrar paz e proteção.
                  </p>
                  <p>
                    Escolhemos este nome porque representa nossa essência: criar um ambiente seguro e confiável 
                    para que pessoas se conectem e encontrem moradia temporária com tranquilidade.
                  </p>
                  <p>
                    Assim como os antigos fristads ofereciam proteção para viajantes, nossa plataforma 
                    oferece segurança para quem busca moradia sem fronteiras.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Princípios */}
      <section className="px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto py-20">
          <div className="text-center mb-16">
            <h2>Nossos Princípios</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Os valores fundamentais que guiam cada decisão e desenvolvimento na Fristad
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {principios.map((principio, index) => (
              <Card key={index} className="p-8 text-center space-y-6 group hover:shadow-lg transition-all">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {principio.icone}
                </div>
                <div className="space-y-3">
                  <h3>{principio.titulo}</h3>
                  <p className="text-sm text-muted-foreground">{principio.descricao}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2>Nossa Jornada</h2>
            <p className="text-lg text-muted-foreground">
              A evolução da Fristad desde a concepção até os dias atuais
            </p>
          </div>

          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                    {index + 1}
                  </div>
                  {index < timeline.length - 1 && (
                    <div className="w-0.5 h-16 bg-border mt-4"></div>
                  )}
                </div>
                <Card className="flex-1 p-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">{item.ano}</Badge>
                      <h4>{item.titulo}</h4>
                    </div>
                    <p className="text-muted-foreground">{item.descricao}</p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* O que não fazemos */}
      <section className="px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto py-20">
          <div className="text-center mb-16">
            <h2>O Que Não Fazemos</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transparência sobre nossos limites e o que deliberadamente escolhemos não ser
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {naoFazemos.map((item, index) => (
              <Card key={index} className="p-8 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    {item.icone}
                  </div>
                  <div className="space-y-2">
                    <h4>{item.titulo}</h4>
                    <p className="text-muted-foreground">{item.descricao}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 inline-block">
              <div className="space-y-4">
                <h4>Foco no Essencial</h4>
                <p className="text-muted-foreground max-w-md">
                  Preferimos fazer poucas coisas muito bem do que tentar ser tudo para todos. 
                  Nossa especialidade são acordos privados para estadias de médio prazo.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Equipe */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2>Nossa Equipe</h2>
            <p className="text-lg text-muted-foreground">
              Especialistas dedicados a transformar a experiência de moradia temporária
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {equipe.map((pessoa, index) => (
              <Card key={index} className="p-8 text-center space-y-6">
                <div className="w-24 h-24 bg-muted rounded-full mx-auto flex items-center justify-center">
                  <Users className="w-8 h-8 text-muted-foreground" />
                </div>
                <div className="space-y-3">
                  <div>
                    <h4>{pessoa.nome}</h4>
                    <p className="text-sm text-muted-foreground">{pessoa.cargo}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{pessoa.bio}</p>
                  <Badge variant="secondary" className="text-xs">
                    {pessoa.especialidade}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Transparência */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="p-12 text-center space-y-8">
            <div className="space-y-4">
              <h2>Compromisso com a Transparência</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Acreditamos que a confiança se constrói através da transparência total. 
                Por isso, somos abertos sobre nossos processos, limitações e objetivos.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="space-y-4">
                <h4>Governança</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    Processos auditáveis
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    Árbitros independentes
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    Código de conduta público
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h4>Dados</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    Minimização de dados
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    Criptografia end-to-end
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    Sem venda de informações
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/privacidade"><Button >
                Política de Privacidade
              </Button></Link>
              <Link to="/legal"><Button variant="outline" >
                Termos de Uso
              </Button></Link>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2>Faça Parte da Fristad</h2>
            <p className="text-lg text-muted-foreground">
              Junte-se a nós na construção de um futuro onde moradia sem fronteiras é acessível, 
              segura e respeitosa para todos.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/hospedes"><Button size="lg" >
              Quero participar
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button></Link>
            <Link to="/anfitrioes"><Button size="lg" variant="outline" >
              Quero hospedar
            </Button></Link>
            <Link to="/contato"><Button size="lg" variant="outline" >
              Entrar em contato
            </Button></Link>
          </div>
        </div>
      </section>
    </div>
  );
}