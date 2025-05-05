import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { MerchantLoginComponent } from './merchant/merchant-login/merchant-login.component';
import { MerchantRegisterComponent } from './merchant/merchant-register/merchant-register.component';
import { DeliveryFormComponent } from './merchant/delivery-form/delivery-form.component';

import { CustomerLoginComponent } from './customer/customer-login/customer-login.component';
import { CustomerRegisterComponent } from './customer/customer-register/customer-register.component';
import { DeliveryTrackingComponent } from './customer/delivery-tracking/delivery-tracking.component';

import { DeliveryLoginComponent } from './delivery/delivery-login/delivery-login.component';
import { DeliveryDashboardComponent } from './delivery/delivery-dashboard/delivery-dashboard.component';
import { deliveryAuthGuard } from './delivery/delivery-auth.guard';
import { DeliveryMyOrdersComponent } from './delivery/delivery-my-orders/delivery-my-orders.component';
import { DeliveryRegisterComponent } from './delivery/delivery-register/delivery-register.component';
import { DeliveryMapComponent } from './delivery/delivery-map/delivery-map.component';
import { DeliveryOrderDetailsComponent } from './delivery/delivery-order-details/delivery-order-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'merchant/login', component: MerchantLoginComponent },
  { path: 'merchant/register', component: MerchantRegisterComponent },
  { path: 'merchant/delivery-form', component: DeliveryFormComponent },

  { path: 'customer/login', component: CustomerLoginComponent },
  { path: 'customer/register', component: CustomerRegisterComponent },
  { path: 'customer/tracking', component: DeliveryTrackingComponent },

  { path: 'delivery/login', component: DeliveryLoginComponent },
  { path: 'delivery/register', component: DeliveryRegisterComponent },
  { path: 'delivery/map', component: DeliveryMapComponent },


  // Rota protegida para o dashboard do entregador
  {
    path: 'delivery/dashboard',
    component: DeliveryDashboardComponent,
    canActivate: [deliveryAuthGuard] // Aqui adicionamos o guard
  },

  // Rota protegida para visualizar as ordens do entregador
  {
    path: 'delivery/my-orders',
    component: DeliveryMyOrdersComponent,
    canActivate: [deliveryAuthGuard] // Aqui também adicionamos o guard
  },

  {
    path: 'delivery/my-orders/:id',
    component: DeliveryOrderDetailsComponent,
    canActivate: [deliveryAuthGuard]
  }


];
