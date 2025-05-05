import { Component, OnInit } from '@angular/core';
import { Delivery } from '../../models/delivery.model';
import { DeliveryService } from '../../services/delivery.service';
import { DeliveryPersonService } from '../../services/delivery-person.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DeliveryCardComponent } from '../../shared/delivery-card/delivery-card.component';

@Component({
  selector: 'app-delivery-my-orders',
  imports: [CommonModule, RouterModule, DeliveryCardComponent],
  standalone: true,
  templateUrl: './delivery-my-orders.component.html',
  styleUrls: ['./delivery-my-orders.component.scss']
})
export class DeliveryMyOrdersComponent implements OnInit {
  deliveries: Delivery[] = [];

  constructor(
    private deliveryService: DeliveryService,
    private deliveryPersonService: DeliveryPersonService
  ) {}

  ngOnInit(): void {
    const logged = this.deliveryPersonService.getLoggedPerson();
    if (!logged) return;

    this.deliveries = this.deliveryService
      .getDeliveries()
      .filter(d => d.assignedTo === logged.id);
  }

  concluirEntrega(entrega: Delivery) {
    entrega.status = 'Finalizada';
    this.deliveryService.updateDelivery(entrega);
  }
}
