import { useState } from "react";
import { Moon, Sun, Home, Users, Settings, Search, Filter, ChevronDown, Star, Heart, Share } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Switch } from "./ui/switch";
import { FristadLogo } from "./FristadLogo";

export function DesignSystemDemo() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen bg-background text-foreground transition-colors duration-300`}>
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <FristadLogo size="lg" />
            <nav className="hidden md:flex items-center gap-8">
              <a href="#styles" className="text-muted-foreground hover:text-foreground transition-colors">Styles</a>
              <a href="#components" className="text-muted-foreground hover:text-foreground transition-colors">Components</a>
              <a href="#examples" className="text-muted-foreground hover:text-foreground transition-colors">Examples</a>
              <a href="#guidelines" className="text-muted-foreground hover:text-foreground transition-colors">Guidelines</a>
            </nav>
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={toggleTheme}
                className="p-2"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12 space-y-24">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <div className="space-y-4">
            <h1 className="display-1">Fristad Design System</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Sistema de identidade visual nórdica e minimalista para moradia sem fronteiras. 
              Construído com autonomia, confiança, simplicidade e privacidade em mente.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <Badge variant="secondary">Nórdico</Badge>
            <Badge variant="secondary">Minimalista</Badge>
            <Badge variant="secondary">Alto Contraste</Badge>
            <Badge variant="secondary">Acessível</Badge>
          </div>
        </section>

        {/* Styles Section */}
        <section id="styles" className="space-y-12">
          <div className="text-center space-y-4">
            <h2>Estilos Fundamentais</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tokens de design, paleta de cores e escalas tipográficas que definem a identidade Fristad.
            </p>
          </div>

          <Tabs defaultValue="colors" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="colors">Cores</TabsTrigger>
              <TabsTrigger value="typography">Tipografia</TabsTrigger>
              <TabsTrigger value="spacing">Espaçamento</TabsTrigger>
            </TabsList>
            
            <TabsContent value="colors" className="space-y-8">
              {/* Brand Colors */}
              <Card className="p-6">
                <h3 className="mb-6">Paleta da Marca</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-fristad-blue-900 rounded-lg"></div>
                    <div className="text-sm">
                      <div className="font-medium">Blue 900</div>
                      <div className="text-muted-foreground">#253C59</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-fristad-blue-800 rounded-lg"></div>
                    <div className="text-sm">
                      <div className="font-medium">Blue 800</div>
                      <div className="text-muted-foreground">#2D4B73</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-fristad-blue-300 rounded-lg"></div>
                    <div className="text-sm">
                      <div className="font-medium">Blue 300</div>
                      <div className="text-muted-foreground">#99B4BF</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-fristad-gold-500 rounded-lg"></div>
                    <div className="text-sm">
                      <div className="font-medium">Gold 500</div>
                      <div className="text-muted-foreground">#D9B70D</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-fristad-bronze-500 rounded-lg"></div>
                    <div className="text-sm">
                      <div className="font-medium">Bronze 500</div>
                      <div className="text-muted-foreground">#BF8D30</div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Semantic Colors */}
              <Card className="p-6">
                <h3 className="mb-6">Cores Semânticas</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <div className="w-full h-12 bg-primary rounded-lg"></div>
                    <div className="text-sm font-medium">Primary</div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-12 bg-secondary rounded-lg"></div>
                    <div className="text-sm font-medium">Secondary</div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-12 bg-accent rounded-lg"></div>
                    <div className="text-sm font-medium">Accent</div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-12 bg-muted rounded-lg"></div>
                    <div className="text-sm font-medium">Muted</div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="typography" className="space-y-8">
              <Card className="p-6 space-y-8">
                <div>
                  <h3 className="mb-6">Escala Tipográfica</h3>
                  <div className="space-y-6">
                    <div>
                      <div className="display-1 mb-2">Display Large</div>
                      <div className="text-sm text-muted-foreground">60px · Extra Bold · -2% Letter Spacing</div>
                    </div>
                    <div>
                      <h1 className="mb-2">Heading 1</h1>
                      <div className="text-sm text-muted-foreground">36px · Bold · -1% Letter Spacing</div>
                    </div>
                    <div>
                      <h2 className="mb-2">Heading 2</h2>
                      <div className="text-sm text-muted-foreground">30px · Semibold</div>
                    </div>
                    <div>
                      <h3 className="mb-2">Heading 3</h3>
                      <div className="text-sm text-muted-foreground">24px · Semibold</div>
                    </div>
                    <div>
                      <p className="body-lg mb-2">Body Large - O texto principal em tamanho confortável para leitura.</p>
                      <div className="text-sm text-muted-foreground">18px · Regular · 1.6 Line Height</div>
                    </div>
                    <div>
                      <p className="body-md mb-2">Body Medium - Texto padrão para interfaces e conteúdo geral.</p>
                      <div className="text-sm text-muted-foreground">16px · Regular · 1.5 Line Height</div>
                    </div>
                    <div>
                      <p className="caption mb-2">Caption - Para legendas, metadados e informações auxiliares.</p>
                      <div className="text-sm text-muted-foreground">12px · Regular · 1.4 Line Height</div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="spacing" className="space-y-8">
              <Card className="p-6">
                <h3 className="mb-6">Sistema de Espaçamento 4/8px</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Space 1', value: '4px', class: 'w-1' },
                    { name: 'Space 2', value: '8px', class: 'w-2' },
                    { name: 'Space 3', value: '12px', class: 'w-3' },
                    { name: 'Space 4', value: '16px', class: 'w-4' },
                    { name: 'Space 6', value: '24px', class: 'w-6' },
                    { name: 'Space 8', value: '32px', class: 'w-8' },
                    { name: 'Space 12', value: '48px', class: 'w-12' },
                    { name: 'Space 16', value: '64px', class: 'w-16' },
                  ].map((space) => (
                    <div key={space.name} className="flex items-center gap-4">
                      <div className="w-20 text-sm font-medium">{space.name}</div>
                      <div className={`h-6 bg-fristad-blue-300 ${space.class}`}></div>
                      <div className="text-sm text-muted-foreground">{space.value}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Components Section */}
        <section id="components" className="space-y-12">
          <div className="text-center space-y-4">
            <h2>Biblioteca de Componentes</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Componentes UI reutilizáveis construídos com os princípios de design Fristad.
            </p>
          </div>

          <div className="grid gap-8">
            {/* Buttons */}
            <Card className="p-6">
              <h3 className="mb-6">Botões</h3>
              <div className="flex flex-wrap gap-4">
                <Button>Primário</Button>
                <Button variant="secondary">Secundário</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button disabled>Desabilitado</Button>
                <Button size="sm">Pequeno</Button>
                <Button size="lg">Grande</Button>
              </div>
            </Card>

            {/* Form Elements */}
            <Card className="p-6">
              <h3 className="mb-6">Elementos de Formulário</h3>
              <div className="grid gap-4 max-w-md">
                <div className="space-y-2">
                  <label htmlFor="email">Email</label>
                  <Input id="email" type="email" placeholder="seu@email.com" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="search">Buscar</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input id="search" placeholder="Buscar propriedades..." className="pl-10" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="notifications" />
                  <label htmlFor="notifications">Receber notificações</label>
                </div>
              </div>
            </Card>

            {/* Cards */}
            <Card className="p-6">
              <h3 className="mb-6">Cards</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="p-4 space-y-3">
                  <div className="w-full h-32 bg-muted rounded-lg"></div>
                  <div className="space-y-2">
                    <h4>Apartamento Nórdico</h4>
                    <p className="text-sm text-muted-foreground">Copenhague, Dinamarca</p>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">€1,200/mês</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-fristad-gold-500 fill-current" />
                        <span className="text-sm">4.8</span>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 space-y-3">
                  <div className="w-full h-32 bg-muted rounded-lg"></div>
                  <div className="space-y-2">
                    <h4>Casa Minimalista</h4>
                    <p className="text-sm text-muted-foreground">Estocolmo, Suécia</p>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">€1,800/mês</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-fristad-gold-500 fill-current" />
                        <span className="text-sm">4.9</span>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 space-y-3">
                  <div className="w-full h-32 bg-muted rounded-lg"></div>
                  <div className="space-y-2">
                    <h4>Loft Moderno</h4>
                    <p className="text-sm text-muted-foreground">Oslo, Noruega</p>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">€2,100/mês</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-fristad-gold-500 fill-current" />
                        <span className="text-sm">5.0</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </Card>

            {/* Badges & Status */}
            <Card className="p-6">
              <h3 className="mb-6">Badges e Status</h3>
              <div className="flex flex-wrap gap-4">
                <Badge>Padrão</Badge>
                <Badge variant="secondary">Secundário</Badge>
                <Badge variant="destructive">Erro</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge className="bg-success text-success-foreground">Sucesso</Badge>
                <Badge className="bg-warning text-warning-foreground">Aviso</Badge>
              </div>
            </Card>
          </div>
        </section>

        {/* Examples Section */}
        <section id="examples" className="space-y-12">
          <div className="text-center space-y-4">
            <h2>Exemplos de Aplicação</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Demonstrações práticas do sistema de design em contextos reais.
            </p>
          </div>

          {/* Hero Example */}
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-br from-fristad-blue-800 to-fristad-blue-900 text-white p-12">
              <div className="max-w-4xl mx-auto text-center space-y-6">
                <h1 className="display-1 text-white">Moradia Sem Fronteiras</h1>
                <p className="text-xl opacity-90 max-w-2xl mx-auto">
                  Encontre sua próxima casa através de acordos privados diretos. 
                  Autonomia, confiança e simplicidade em cada transação.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button size="lg" className="bg-white text-fristad-blue-800 hover:bg-neutral-100">
                    Explorar Propriedades
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Como Funciona
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Features Grid */}
          <Card className="p-8">
            <div className="text-center mb-12">
              <h2>Por que Fristad?</h2>
              <p className="text-muted-foreground mt-4">Os pilares da nossa plataforma</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-fristad-blue-100 dark:bg-fristad-blue-800/20 rounded-lg flex items-center justify-center mx-auto">
                  <Home className="w-6 h-6 text-fristad-blue-800 dark:text-fristad-blue-300" />
                </div>
                <div>
                  <h4>Autonomia</h4>
                  <p className="text-sm text-muted-foreground">Controle total sobre suas escolhas de moradia</p>
                </div>
              </div>
              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-fristad-blue-100 dark:bg-fristad-blue-800/20 rounded-lg flex items-center justify-center mx-auto">
                  <Users className="w-6 h-6 text-fristad-blue-800 dark:text-fristad-blue-300" />
                </div>
                <div>
                  <h4>Confiança</h4>
                  <p className="text-sm text-muted-foreground">Verificação rigorosa de proprietários e inquilinos</p>
                </div>
              </div>
              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-fristad-blue-100 dark:bg-fristad-blue-800/20 rounded-lg flex items-center justify-center mx-auto">
                  <Settings className="w-6 h-6 text-fristad-blue-800 dark:text-fristad-blue-300" />
                </div>
                <div>
                  <h4>Simplicidade</h4>
                  <p className="text-sm text-muted-foreground">Processo direto, sem intermediários desnecessários</p>
                </div>
              </div>
              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-fristad-blue-100 dark:bg-fristad-blue-800/20 rounded-lg flex items-center justify-center mx-auto">
                  <Settings className="w-6 h-6 text-fristad-blue-800 dark:text-fristad-blue-300" />
                </div>
                <div>
                  <h4>Privacidade</h4>
                  <p className="text-sm text-muted-foreground">Seus dados protegidos com máxima segurança</p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Guidelines Section */}
        <section id="guidelines" className="space-y-12">
          <div className="text-center space-y-4">
            <h2>Diretrizes da Marca</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Princípios e boas práticas para manter a consistência da identidade Fristad.
            </p>
          </div>

          <div className="grid gap-8">
            {/* Logo Usage */}
            <Card className="p-6">
              <h3 className="mb-6">Uso do Logo</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="mb-4 text-success">✓ Correto</h4>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <FristadLogo size="lg" />
                    </div>
                    <div className="p-4 bg-fristad-blue-900 rounded-lg">
                      <FristadLogo size="lg" className="text-white" />
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <FristadLogo size="sm" variant="symbol" />
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="mb-4 text-destructive">✗ Incorreto</h4>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg opacity-50">
                      <div className="transform scale-y-150">
                        <FristadLogo size="lg" />
                      </div>
                    </div>
                    <div className="p-4 bg-muted rounded-lg opacity-50">
                      <div className="transform rotate-12">
                        <FristadLogo size="lg" />
                      </div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg opacity-50">
                      <FristadLogo size="lg" />
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Do's and Don'ts */}
            <Card className="p-6">
              <h3 className="mb-6">Princípios de Design</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="mb-4 text-success">✓ Faça</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Use alto contraste para melhor legibilidade</li>
                    <li>• Mantenha o design limpo e minimalista</li>
                    <li>• Respeite os espaçamentos do sistema 4/8px</li>
                    <li>• Use a tipografia Funnel Sans consistentemente</li>
                    <li>• Aplique as cores da marca adequadamente</li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-4 text-destructive">✗ Não Faça</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Use cores fora da paleta estabelecida</li>
                    <li>• Sobrecarregue a interface com elementos</li>
                    <li>• Ignore as diretrizes de acessibilidade</li>
                    <li>• Modifique as proporções do logo</li>
                    <li>• Use gradientes ou efeitos excessivos</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-24">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <FristadLogo />
            <div className="text-sm text-muted-foreground">
              © 2024 Fristad. Sistema de design nórdico para moradia sem fronteiras.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}