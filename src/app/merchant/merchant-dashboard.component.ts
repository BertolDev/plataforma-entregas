import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryService } from '../services/delivery.service';
import { Delivery } from '../models/delivery.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-merchant-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './merchant-dashboard.component.html',
  styleUrls: ['./merchant-dashboard.component.scss']
})
export class MerchantDashboardComponent implements OnInit {
  deliveries: Delivery[] = [];
  merchantId = '';

  constructor(
    private deliveryService: DeliveryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const merchant = JSON.parse(localStorage.getItem('loggedMerchant') || '{}');
    if (!merchant?.id) {
      this.router.navigate(['/merchant/login']);
      return;
    }

    this.merchantId = merchant.id;
    this.deliveries = this.deliveryService.getDeliveriesByMerchant(this.merchantId);
  }
}
