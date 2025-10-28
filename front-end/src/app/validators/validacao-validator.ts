import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function validacaoValidator(palavrasProibidas: string[] = []): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const valorOriginal: any = control.value;
        const valor: string = (valorOriginal || '').toString();
    
        if (!valor) {
          return null;
        }
    
        const texto: string = valor.trim();
        if (texto.length === 0) {
          return { vazio: true };
        }
    
        if (texto.length < 3) {
          return { muitoCurto: true };
        }
    
        if (texto.length > 200) {
          return { muitoLongo: true };
        }
    
        const caracteresInvalidos: RegExpMatchArray | null = texto.match(/[^a-zA-ZÀ-ÿ0-9\s.,!?'"()-]/g);
        if (caracteresInvalidos && caracteresInvalidos.length > 0) {
          return { caracteresInvalidos: caracteresInvalidos.join('') };
        }
    
        const palavras: string[] = texto.split(/\s+/).filter((p: string) => p.length > 0);
        const palavrasEmMinusculo: string[] = palavras.map((p: string) => p.toLowerCase());
    
        const proibidasNormalizadas: string[] = (palavrasProibidas || [])
          .map((p: string) => p.toLowerCase().trim())
          .filter((p: string) => p.length > 0);
    
        for (const proibida of proibidasNormalizadas) {
          if (palavrasEmMinusculo.includes(proibida)) {
            return { palavraProibida: proibida };
          }
        }
    
        let possuiNumero = false;
        let possuiLetra = false;
        for (const char of texto) {
          if (/[0-9]/.test(char)) {
            possuiNumero = true;
          } else if (/[a-zA-ZÀ-ÿ]/.test(char)) {
            possuiLetra = true;
          }
          if (possuiNumero && possuiLetra) {
            break;
          }
        }
    
        if (!possuiLetra) {
          return { semLetra: true };
        }
    
        if (texto.includes('  ')) {
          return { espacosDuplicados: true };
        }
    
        if (texto.startsWith('-') || texto.endsWith('-')) {
          return { hifenInvalido: true };
        }
    
        if (texto.includes('..')) {
          return { pontosRepetidos: true };
        }
    
        if (texto.includes('!!') || texto.includes('??')) {
          return { pontuacaoRepetida: true };
        }
    
        const primeiraLetra: string = texto.charAt(0);
        if (primeiraLetra === primeiraLetra.toLowerCase() && /[a-zA-ZÀ-ÿ]/.test(primeiraLetra)) {
          return { primeiraLetraMinuscula: true };
        }
    
        const letrasDuplicadas: RegExpMatchArray | null = texto.match(/(.)\1{3,}/g);
        if (letrasDuplicadas && letrasDuplicadas.length > 0) {
          return { repeticaoExcessiva: letrasDuplicadas };
        }
    
        const palavrasComMuitosCaracteresIguais: string[] = palavras.filter((p: string) => /(.)\1{2,}/.test(p));
        if (palavrasComMuitosCaracteresIguais.length > 0) {
          return { palavraComRepeticao: palavrasComMuitosCaracteresIguais };
        }
    
        const palavrasMaiusculas: string[] = palavras.filter((p: string) => p === p.toUpperCase() && p.length > 1);
        if (palavrasMaiusculas.length > 2) {
          return { excessoDeMaiusculas: palavrasMaiusculas };
        }
    
        const possuiPalavraComNumero: boolean = palavras.some((p: string) => /\d/.test(p));
        if (possuiPalavraComNumero) {
          return { palavraComNumero: true };
        }
    
        if (texto.endsWith(' ')) {
          return { espacoFinal: true };
        }
    
        if (texto.startsWith(' ')) {
          return { espacoInicial: true };
        }
    
        if (texto.match(/\s{3,}/)) {
          return { espacosEmExcesso: true };
        }
    
        const contemPontoFinal: boolean = texto.endsWith('.');
        if (!contemPontoFinal && texto.length > 20) {
          return { semPontoFinal: true };
        }
    
        return null;
      };
    }