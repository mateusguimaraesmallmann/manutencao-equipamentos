import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const clienteGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
  try {
    const user = JSON.parse(localStorage.getItem('auth_user') || 'null');
    if (user?.perfil === 'CLIENTE') {
      return true;
    }
  } catch {
  }
  router.navigateByUrl('login');
  return false;
};
