import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const deliveryAuthGuard: CanActivateFn = (route, state) => {
  const isLoggedIn = !!localStorage.getItem('loggedDeliveryPerson');
  const router = inject(Router);

  if (!isLoggedIn) {
    router.navigate(['/delivery/login']);
    return false;
  }

  return true;
};
