import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { dict, getLang, type Lang } from "../../i18n";
import { useEffect, useState } from "react";

interface ObrigadoPageProps {
}

export function ObrigadoPage() {
  const SHOW_INSTITUTIONAL_LINK = false;
  const [lang, setLangState] = useState<Lang>('pt');
  useEffect(() => setLangState(getLang()), []);
  return (
    <section className="px-4 sm:px-6 lg:px-8 pt-20 pb-16 min-h-screen flex items-center">
      <div className="max-w-2xl mx-auto w-full">
        <Card className="p-10 text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-success/10 rounded-2xl flex items-center justify-center text-success">
              <CheckCircle2 className="w-8 h-8" />
            </div>
          </div>
          <h1>{lang === 'pt' ? dict.pt.obrigado.title : dict.en.obrigado.title}</h1>
          <p className="text-muted-foreground">
            {lang === 'pt' ? dict.pt.obrigado.desc : dict.en.obrigado.desc}
          </p>
          <div className="flex gap-3 justify-center">
            <Link to="/">
              <Button>{lang === 'pt' ? dict.pt.obrigado.backHome : dict.en.obrigado.backHome}</Button>
            </Link>
            {SHOW_INSTITUTIONAL_LINK && (
              <Link to="/sobre">
                <Button variant="outline">{lang === 'pt' ? dict.pt.obrigado.learn : dict.en.obrigado.learn}</Button>
              </Link>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
}


