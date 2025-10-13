import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AutenticacaoService } from '../app/services/autenticacao.service';

const API_BASE = 'http://localhost:8080';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith(API_BASE)) {

    const isPublic = req.url.endsWith('/auth/login') || req.url.endsWith('/register');

    if (!isPublic) {
      const auth = inject(AutenticacaoService);
      const token = auth.token;
      if (token) {
        req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
      }
    }
  }
  return next(req);
};