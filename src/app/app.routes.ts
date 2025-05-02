import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { MerchantLoginComponent } from './merchant/merchant-login/merchant-login.component';
import { MerchantRegisterComponent } from './merchant/merchant-register/merchant-register.component';
import { DeliveryFormComponent } from './merchant/delivery-form/delivery-form.component';

import { CustomerLoginComponent } from './customer/customer-login/customer-login.component';
import { CustomerRegisterComponent } from './customer/customer-register/customer-register.component';
import { DeliveryTrackingComponent } from './customer/delivery-tracking/delivery-tracking.component';

import { DeliveryLoginComponent } from './delivery-person/delivery-login/delivery-login.component';
import { DeliveryListComponent } from './delivery-person/delivery-list/delivery-list.component';
import { deliveryAuthGuard } from './delivery-person/delivery-auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'merchant/login', component: MerchantLoginComponent },
  { path: 'merchant/register', component: MerchantRegisterComponent },
  { path: 'merchant/delivery-form', component: DeliveryFormComponent },
  { path: 'merchant/delivery-list', component: DeliveryListComponent },

  { path: 'customer/login', component: CustomerLoginComponent },
  { path: 'customer/register', component: CustomerRegisterComponent },
  { path: 'customer/tracking', component: DeliveryTrackingComponent },

  { path: 'delivery/login', component: DeliveryLoginComponent },
  { path: 'delivery/list', component: DeliveryListComponent },

  {
    path: 'delivery/list',
    canActivate: [deliveryAuthGuard],
    loadComponent: () =>
      import('./delivery-person/delivery-list/delivery-list.component').then(
        (m) => m.DeliveryListComponent
      ),
  },
];
