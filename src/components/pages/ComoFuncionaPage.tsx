import { Link } from "react-router-dom";
import { CheckCircle, Users, FileText, Shield, ArrowRight, Clock, MapPin, CreditCard } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";

interface ComoFuncionaPageProps {
}

export function ComoFuncionaPage() {
  const processo = [
    {
      fase: "1",
      titulo: "Descoberta",
      icone: <Users className="w-6 h-6" />,
      descricao: "Hóspedes buscam propriedades e anfitriões avaliam interessados",
      detalhes: [
        "Perfis verificados de hóspedes e propriedades",
        "Filtros por localização, duração e preferências",
        "Sistema de compatibilidade baseado em critérios mútuos",
        "Comunicação inicial através da plataforma"
      ]
    },
    {
      fase: "2", 
      titulo: "Negociação",
      icone: <FileText className="w-6 h-6" />,
      descricao: "Partes definem termos personalizados para o acordo",
      detalhes: [
        "Discussão de valores, prazos e condições especiais",
        "Templates de acordo adaptáveis às necessidades",
        "Suporte para cláusulas personalizadas",
        "Revisão legal opcional dos termos"
      ]
    },
    {
      fase: "3",
      titulo: "Formalização", 
      icone: <Shield className="w-6 h-6" />,
      descricao: "Acordo registrado com proteção e arbitragem independente",
      detalhes: [
        "Registro imutável dos termos acordados",
        "Designação de árbitro neutro qualificado",
        "Ativação das proteções contratuais",
        "Cronograma de pagamentos estabelecido"
      ]
    }
  ];

  const arbitragem = [
    {
      titulo: "Seleção Independente",
      descricao: "Árbitros qualificados são designados aleatoriamente, sem influência das partes",
      icone: <Shield className="w-5 h-5" />
    },
    {
      titulo: "Processo Transparente", 
      descricao: "Procedimentos claros com prazos definidos e comunicação aberta",
      icone: <Clock className="w-5 h-5" />
    },
    {
      titulo: "Decisão Vinculante",
      descricao: "Resoluções finais aplicadas automaticamente, garantindo cumprimento",
      icone: <CheckCircle className="w-5 h-5" />
    }
  ];

  const previsibilidade = [
    {
      aspecto: "Financeiro",
      descricao: "Valores, datas e condições de pagamento definidos desde o início",
      beneficios: ["Sem surpresas nas taxas", "Cronograma transparente", "Proteção contra alterações unilaterais"]
    },
    {
      aspecto: "Jurídico", 
      descricao: "Marco legal claro com procedimentos de resolução de conflitos",
      beneficios: ["Jurisdição definida", "Árbitros especializados", "Prazos respeitados"]
    },
    {
      aspecto: "Operacional",
      descricao: "Processos padronizados que garantem experiência consistente", 
      beneficios: ["Check-in/out simplificado", "Suporte especializado", "Comunicação eficiente"]
    }
  ];

  return (
    <div className="space-y-24">
      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Badge variant="secondary">Processo Simples</Badge>
          <h1>Como Funciona a Fristad</h1>
          <p className="text-xl text-muted-foreground">
            Um processo transparente que conecta pessoas através de acordos privados seguros, 
            com arbitragem independente e previsibilidade total.
          </p>
        </div>
      </section>

      {/* Processo Principal */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2>Processo em 3 Fases</h2>
            <p className="text-lg text-muted-foreground mt-4">
              Da conexão inicial ao acordo finalizado
            </p>
          </div>

          <div className="space-y-12">
            {processo.map((fase, index) => (
              <div key={index} className="relative">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-bold">
                        {fase.fase}
                      </div>
                      <div>
                        <h3>{fase.titulo}</h3>
                        <p className="text-muted-foreground">{fase.descricao}</p>
                      </div>
                    </div>
                    
                    <ul className="space-y-3">
                      {fase.detalhes.map((detalhe, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{detalhe}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Card className={`p-8 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto text-primary">
                          {fase.icone}
                        </div>
                        <div className="space-y-2">
                          <h4>Fase {fase.fase}</h4>
                          <p className="text-sm text-muted-foreground max-w-xs">
                            Ilustração do processo de {fase.titulo.toLowerCase()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                {index < processo.length - 1 && (
                  <div className="flex justify-center my-8">
                    <ArrowRight className="w-6 h-6 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Acordos Privados */}
      <section className="px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <h2>Acordos Privados Diretos</h2>
                <p className="text-lg text-muted-foreground">
                  Eliminamos intermediários desnecessários, permitindo que hóspedes e anfitriões 
                  negociem diretamente os termos que fazem sentido para ambos.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4>Autonomia Total</h4>
                    <p className="text-sm text-muted-foreground">
                      Você define seus próprios termos, preços e condições sem imposições externas.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CreditCard className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4>Transparência Financeira</h4>
                    <p className="text-sm text-muted-foreground">
                      Valores claros desde o início, sem taxas ocultas ou surpresas no processo.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4>Flexibilidade Legal</h4>
                    <p className="text-sm text-muted-foreground">
                      Adapte cláusulas às suas necessidades específicas com suporte jurídico.
                    </p>
                  </div>
                </div>
              </div>

              <Link to="/hospedes"><Button >
                Ver como participar
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button></Link>
            </div>

            <Card className="p-8">
              <div className="space-y-6">
                <h4>Elementos do Acordo</h4>
                <div className="space-y-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Duração</span>
                      <Badge variant="outline">1-6 meses</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Períodos flexíveis adequados para estadias de médio prazo
                    </p>
                  </div>

                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Valores</span>
                      <Badge variant="outline">Personalizados</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Preços negociados diretamente entre as partes
                    </p>
                  </div>

                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Proteções</span>
                      <Badge variant="outline">Garantidas</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Árbitro independente e registro imutável dos termos
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Arbitragem Independente */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2>Arbitragem Independente</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Sistema de resolução de conflitos neutro e eficiente, garantindo justiça para todas as partes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {arbitragem.map((item, index) => (
              <Card key={index} className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto text-primary">
                  {item.icone}
                </div>
                <div className="space-y-2">
                  <h4>{item.titulo}</h4>
                  <p className="text-sm text-muted-foreground">{item.descricao}</p>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-8 bg-gradient-to-br from-secondary/10 to-primary/5">
            <div className="text-center space-y-4">
              <h3>Por que Arbitragem?</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Diferente de tribunais tradicionais, nossa arbitragem é especializada em acordos de moradia, 
                oferecendo resoluções rápidas, econômicas e definitivas.
              </p>
              <Link to="/arbitragem"><Button 
                variant="outline" 
                
              >
                Saiba mais sobre arbitragem
              </Button></Link>
            </div>
          </Card>
        </div>
      </section>

      {/* Previsibilidade */}
      <section className="px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto py-20">
          <div className="text-center mb-16">
            <h2>Previsibilidade em Todos os Aspectos</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transparência total para que você saiba exatamente o que esperar
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {previsibilidade.map((item, index) => (
              <Card key={index} className="p-8 space-y-6">
                <div className="space-y-4">
                  <h3>{item.aspecto}</h3>
                  <p className="text-muted-foreground">{item.descricao}</p>
                </div>
                
                <div className="space-y-3">
                  {item.beneficios.map((beneficio, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                      <span className="text-sm">{beneficio}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Brief */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="p-12 text-center space-y-8">
            <div className="space-y-4">
              <h2>Tecnologia Como Prova</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Utilizamos tecnologia moderna para garantir a imutabilidade dos acordos e 
                a transparência dos processos, sem complicações desnecessárias.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="space-y-4">
                <h4>Registro Imutável</h4>
                <p className="text-sm text-muted-foreground">
                  Seus acordos são registrados de forma que não podem ser alterados unilateralmente, 
                  garantindo que os termos combinados sejam sempre respeitados.
                </p>
              </div>

              <div className="space-y-4">
                <h4>Transparência Total</h4>
                <p className="text-sm text-muted-foreground">
                  Todas as partes têm acesso às mesmas informações, eliminando assimetrias 
                  e garantindo confiança mútua no processo.
                </p>
              </div>
            </div>

            <Link to="/sobre"><Button 
              variant="outline" 
              
            >
              Conheça nossa filosofia
            </Button></Link>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2>Pronto Para Começar?</h2>
            <p className="text-lg text-muted-foreground">
              Descubra como nossa abordagem pode simplificar sua próxima experiência de moradia
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/hospedes"><Button 
              size="lg"
              
            >
              Quero participar
            </Button></Link>
            <Link to="/anfitrioes"><Button 
              size="lg" 
              variant="outline"
              
            >
              Quero hospedar
            </Button></Link>
          </div>
        </div>
      </section>
    </div>
  );
}