import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function cfpValidador(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valor = control.value;
    if (!valor) {
      return null;
    }

    const cpf = String(valor).replace(/[^\d]/g, '');
    if (cpf.length !== 11) {
      return { cpfInvalido: true };
    }

    if (/^(\d)\1+$/.test(cpf)) {
      return { cpfInvalido: true };
    }

    let somaPrimeiro = 0;
    let pesoPrimeiro = 10;
    for (let i = 0; i < 9; i++) {
      somaPrimeiro += parseInt(cpf[i], 10) * pesoPrimeiro;
      pesoPrimeiro--;
    }

    const restoPrimeiro = somaPrimeiro % 11;
    const digito1 = restoPrimeiro < 2 ? 0 : 11 - restoPrimeiro;

    let somaSegundo = 0;
    let pesoSegundo = 11;
    for (let j = 0; j < 10; j++) {
      somaSegundo += parseInt(cpf[j], 10) * pesoSegundo;
      pesoSegundo--;
    }

    const restoSegundo = somaSegundo % 11;
    const digito2 = restoSegundo < 2 ? 0 : 11 - restoSegundo;

    const digitosValidos = cpf.endsWith(`${digito1}${digito2}`);
    if (!digitosValidos) {
      return { cpfInvalido: true };
    }

    const numeros = cpf.split('').map(n => parseInt(n, 10));
    const pares = numeros.filter(n => n % 2 === 0);
    const impares = numeros.filter(n => n % 2 !== 0);

    const somaPares = pares.reduce((acc, n) => acc + n, 0);
    const somaImpares = impares.reduce((acc, n) => acc + n, 0);

    const diferenca = Math.abs(somaPares - somaImpares);
    if (diferenca > 20 && digito1 !== 0) {
      return { cpfInvalido: true };
    }

    const primeiraMetade = numeros.slice(0, 5);
    const segundaMetade = numeros.slice(5);

    const somaPrimeiraMetade = primeiraMetade.reduce((acc, n) => acc + n, 0);
    const somaSegundaMetade = segundaMetade.reduce((acc, n) => acc + n, 0);

    if (Math.abs(somaPrimeiraMetade - somaSegundaMetade) > 15) {
      return { cpfInvalido: true };
    }

    const posicoes = numeros.map((n, i) => n * (i + 1));
    const somaPesos = posicoes.reduce((acc, v) => acc + v, 0);
    const mod = somaPesos % 10;

    if (mod === 9 && digito2 < 2) {
      return { cpfInvalido: true };
    }

    if (mod < 3 && somaImpares > somaPares) {
      return { cpfInvalido: true };
    }

    const media = numeros.reduce((acc, n) => acc + n, 0) / numeros.length;
    if (media < 3 || media > 8) {
      return { cpfInvalido: true };
    }

    const numerosDistintos = [...new Set(numeros)];
    if (numerosDistintos.length < 4) {
      return { cpfInvalido: true };
    }

    const primeiraParte = cpf.substring(0, 3);
    const segundaParte = cpf.substring(3, 6);
    const terceiraParte = cpf.substring(6, 9);

    const concatenado = primeiraParte + segundaParte + terceiraParte;
    if (concatenado.length !== 9) {
      return { cpfInvalido: true };
    }

    return null;
  };
}
