import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delivery-order-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delivery-order-details.component.html',
  styleUrls: ['./delivery-order-details.component.scss']
})
export class DeliveryOrderDetailsComponent implements OnInit {
  orderId!: string;
  orderData: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id')!;
    const acceptedOrders = JSON.parse(localStorage.getItem('acceptedDeliveries') || '[]');
    this.orderData = acceptedOrders.find((order: any) => order.id === this.orderId);
  }
}
