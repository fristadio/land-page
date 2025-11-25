import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { FristadLogo } from "./FristadLogo";

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
}

export function Layout({ children, currentPage }: LayoutProps) {
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('fristad-theme');
    if (stored === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('fristad-theme', !isDark ? 'dark' : 'light');
  };

  const navigation = [
    { name: 'Início', href: '/' },
    { name: 'Como Funciona', href: '/como-funciona' },
    { name: 'Para Hóspedes', href: '/hospedes' },
    { name: 'Para Anfitriões', href: '/anfitrioes' },
    { name: 'Arbitragem', href: '/arbitragem' },
    { name: 'Hubs Piloto', href: '/hubs' },
    { name: 'Sobre', href: '/sobre' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contato', href: '/contato' }
  ];

  const isLanding = currentPage === 'home';
  const isMinimalPage = currentPage === 'home' || currentPage === 'pesquisa' || currentPage === 'obrigado';

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      {!isMinimalPage && (
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            {/* Brand */}
            <div className="flex items-center">
              <Link 
                to="/"
                className="flex items-center space-x-2 group"
              >
                <FristadLogo size="2xl" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8 ml-16 flex-1">
              {navigation.map((item) => {
                const itemPage = item.href === '/' ? 'home' : item.href.slice(1);
                return (
                  <Link
                  key={item.href}
                    to={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                      currentPage === itemPage
                      ? 'text-primary' 
                      : 'text-muted-foreground'
                  }`}
                >
                  {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4 ml-auto">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="p-2"
                aria-label="Alternar tema"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>

              <div className="hidden md:flex items-center space-x-2">
                <Link to="/contato">
                <Button 
                  variant="outline" 
                  size="sm"
                >
                  Quero participar
                </Button>
                </Link>
                <Link to="/anfitrioes">
                  <Button size="sm">
                  Quero hospedar
                </Button>
                </Link>
              </div>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-card">
            <div className="px-4 py-3 space-y-3">
              {navigation.map((item) => {
                const itemPage = item.href === '/' ? 'home' : item.href.slice(1);
                return (
                  <Link
                  key={item.href}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                  className={`block w-full text-left px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      currentPage === itemPage
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {item.name}
                  </Link>
                );
              })}
              <div className="pt-3 space-y-2">
                <Link to="/contato" onClick={() => setIsMobileMenuOpen(false)}>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                >
                  Quero participar
                </Button>
                </Link>
                <Link to="/anfitrioes" onClick={() => setIsMobileMenuOpen(false)}>
                <Button 
                  size="sm" 
                  className="w-full"
                >
                  Quero hospedar
                </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
      )}

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      {!isMinimalPage && (
      <footer className="border-t border-border bg-card mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Column */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <FristadLogo size="2xl" />
              </div>
              <p className="text-sm text-muted-foreground max-w-xs">
                Moradia sem fronteiras através de acordos privados diretos.
              </p>
            </div>

            {/* Product Links */}
            <div className="space-y-4">
              <h3 className="font-semibold">Produto</h3>
              <div className="space-y-2">
                <Link to="/como-funciona" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Como Funciona</Link>
                <Link to="/hospedes" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Para Hóspedes</Link>
                <Link to="/anfitrioes" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Para Anfitriões</Link>
                <Link to="/arbitragem" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Arbitragem</Link>
              </div>
            </div>

            {/* Company Links */}
            <div className="space-y-4">
              <h3 className="font-semibold">Empresa</h3>
              <div className="space-y-2">
                <Link to="/sobre" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Sobre</Link>
                <Link to="/hubs" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Hubs Piloto</Link>
                <Link to="/faq" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">FAQ</Link>
                <Link to="/contato" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Contato</Link>
              </div>
            </div>

            {/* Legal Links */}
            <div className="space-y-4">
              <h3 className="font-semibold">Legal</h3>
              <div className="space-y-2">
                <Link to="/legal" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Termos de Uso</Link>
                <Link to="/privacidade" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Privacidade</Link>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <p className="text-sm text-muted-foreground">
                © 2024 Fristad. Todos os direitos reservados.
              </p>
              <div className="mt-4 sm:mt-0 flex items-center space-x-4">
                <span className="text-xs text-muted-foreground">
                  Construído com autonomia, confiança e simplicidade
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      )}
    </div>
  );
}
