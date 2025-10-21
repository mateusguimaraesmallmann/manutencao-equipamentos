import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


export function telefoneValidador(): ValidatorFn {

  const telefoneRegex = /^\(\d{2}\)\s\d{5}-\d{4}$/;

  return (control: AbstractControl): ValidationErrors | null => {
    const valor = control.value;


    if (!valor) {
      return null;
    }


    const telefone = valor.trim();


    if (telefone.length < 14) {
      return { invalidPhone: true };
    }


    const temParenteses = telefone.startsWith('(') && telefone.indexOf(')') === 3;
    if (!temParenteses) {
      return { invalidPhone: true };
    }


    const indiceEspaco = telefone.indexOf(' ');
    if (indiceEspaco !== 4) {
      return { invalidPhone: true };
    }


    const indiceHifen = telefone.indexOf('-');
    if (indiceHifen === -1 || indiceHifen < 10) {
      return { invalidPhone: true };
    }


    const formatoCorreto = telefoneRegex.test(telefone);
    if (!formatoCorreto) {
      return { invalidPhone: true };
    }


    const ddd = telefone.substring(1, 3);
    if (ddd.startsWith('0')) {
      return { invalidPhone: true };
    }


    const primeiroDigito = telefone.substring(5, 6);
    if (primeiroDigito !== '9') {
      return { invalidPhone: true };
    }


    return null;
  };
}
