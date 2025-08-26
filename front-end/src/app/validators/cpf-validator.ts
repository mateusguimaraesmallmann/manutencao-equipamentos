import { AbstractControl, ValidationErrors } from '@angular/forms';

export function cpfValidador(control: AbstractControl): ValidationErrors | null {
  const cpf = control.value;
  if (!cpf) return null;

  const cpfClean = cpf.replace(/\D/g, '');

  if (cpfClean.length !== 11 || /^(\d)\1{10}$/.test(cpfClean)) {
    return { cpfInvalid: true };
  }

  let sum = 0;
  let remainder;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpfClean.substring(i - 1, i), 10) * (11 - i);
  }
  
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpfClean.substring(9, 10), 10)) {
    return { cpfInvalid: true };
  }

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpfClean.substring(i - 1, i), 10) * (12 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpfClean.substring(10, 11), 10)) {
    return { cpfInvalid: true };
  }

  return null;
}