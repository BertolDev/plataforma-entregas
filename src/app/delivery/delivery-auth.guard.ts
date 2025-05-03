import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DeliveryPersonService } from '../services/delivery-person.service';

export const deliveryAuthGuard: CanActivateFn = () => {
  const deliveryPersonService = inject(DeliveryPersonService);
  const router = inject(Router);

  const isLoggedIn = !!deliveryPersonService.getLoggedPerson();

  if (!isLoggedIn) {
    router.navigate(['/delivery/login']);
    return false;
  }

  return true;
};
