import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


export function emailValidador(): ValidatorFn {
  const BLACKLISTED_DOMAINS = new Set<string>([
    'mailinator.com',
    'guerrillamail.com',
    '10minutemail.com',
    'tempmail.com',
    'yopmail.com',
  ]);

  // Limites típicos recomendados
  const MAX_TOTAL_LENGTH = 254;
  const MAX_LOCAL_LENGTH = 64;
  const MAX_LABEL_LENGTH = 63;

  const LOCAL_ALLOWED = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+$/;

  const DOMAIN_LABEL = /^(?!-)[A-Za-z0-9-]{1,63}(?<!-)$/;

  const SIMPLE_TLD = /^[A-Za-z]{2,}$/;

  const err = (key: string, extra: Record<string, unknown> = {}): ValidationErrors =>
    ({ [key]: { ...extra } });

  function isValidDomain(domain: string): boolean {
    const labels = domain.split('.');
    if (labels.length < 2) return false;

    for (const label of labels) {
      if (label.length === 0) return false;
      if (label.length > MAX_LABEL_LENGTH) return false;
      if (!DOMAIN_LABEL.test(label)) return false;
    }

    const tld = labels[labels.length - 1];
    if (!SIMPLE_TLD.test(tld)) return false;

    return true;
  }

  function isValidLocalPart(local: string): boolean {
    if (local.length === 0) return false;
    if (local.length > MAX_LOCAL_LENGTH) return false;
    if (!LOCAL_ALLOWED.test(local)) return false;
    if (local.startsWith('.') || local.endsWith('.')) return false;
    if (local.includes('..')) return false; // sem pontos consecutivos
    if (/\s/.test(local)) return false;     // sem espaços
    return true;
  }

  return (control: AbstractControl): ValidationErrors | null => {
    const raw = control.value;

    if (raw == null || raw === '') return null;

    const value = String(raw).trim();

    if (value.length > MAX_TOTAL_LENGTH) {
      return err('emailTooLong', { max: MAX_TOTAL_LENGTH, length: value.length });
    }

    // Deve conter exatamente 1 "@"
    const atIndex = value.indexOf('@');
    if (atIndex <= 0 || atIndex !== value.lastIndexOf('@')) {
      return err('invalidAtSymbol');
    }

    const local = value.slice(0, atIndex);
    const domain = value.slice(atIndex + 1);

    if (!isValidLocalPart(local)) {
      return err('invalidLocalPart');
    }

    if (/\s/.test(domain) || domain.includes('..')) {
      return err('invalidDomainFormat');
    }
    if (!isValidDomain(domain)) {
      return err('invalidDomain');
    }

    // Domínio em blacklist? (opcional)
    const domainLower = domain.toLowerCase();
    if (BLACKLISTED_DOMAINS.has(domainLower)) {
      return err('blockedDomain', { domain });
    }

    return null;
  };
}