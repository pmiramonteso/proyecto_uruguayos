import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  if (route.data['roles']) {
    const roles = route.data['roles'];
    const userRole = authService.isAdmin() ? 'admin' : 'user'; 

  if (!roles.includes(userRole)) {
      router.navigate(['/home']);
      return false;
    }
  }
  return true;
};

