import { inject } from '@angular/core';
import { CanMatchFn, Router, UrlTree } from '@angular/router';

export const funcionarioGuard: CanMatchFn = (): boolean | UrlTree => {
  const router = inject(Router);

  try {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (user?.perfil === 'FUNCIONARIO') {
      return true;
    }
  } catch {}

  return router.createUrlTree(['/login']);
};
