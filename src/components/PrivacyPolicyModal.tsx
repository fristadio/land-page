import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { dict, getLang } from "../i18n";

interface PrivacyPolicyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PrivacyPolicyModal({ open, onOpenChange }: PrivacyPolicyModalProps) {
  const lang = getLang();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{lang === 'pt' ? dict.pt.privacyModal.title : dict.en.privacyModal.title}</DialogTitle>
          <DialogDescription>
            {lang === 'pt' ? dict.pt.privacyModal.description : dict.en.privacyModal.description}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 text-sm text-muted-foreground">
          <p>{lang === 'pt' ? dict.pt.privacyModal.p1 : dict.en.privacyModal.p1}</p>
          <ul className="space-y-2 list-disc pl-5">
            {(lang === 'pt' ? dict.pt.privacyModal.list : dict.en.privacyModal.list).map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <p>{lang === 'pt' ? dict.pt.privacyModal.p2 : dict.en.privacyModal.p2}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}


