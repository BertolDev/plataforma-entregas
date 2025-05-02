import { Injectable } from '@angular/core';
import { Delivery } from '../../models/delivery.model';

@Injectable({
  providedIn: 'root',
})
export class DeliveryService {
  private storageKey = 'registeredDeliveries';

  addDelivery(delivery: Omit<Delivery, 'id'>): void {
    const deliveries = this.getDeliveries();
    const newDelivery = {
      ...delivery,
      id: Date.now()
    };
    deliveries.push(newDelivery);
    localStorage.setItem(this.storageKey, JSON.stringify(deliveries));

    // Adicionando console.log para verificar
    console.log('Entregas após adição:', deliveries);  // Verifique se as entregas estão sendo salvas corretamente
  }

  getDeliveries(): Delivery[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? (JSON.parse(data) as Delivery[]) : [];
  }

  deleteDelivery(id: number): void {
    const deliveries = this.getDeliveries().filter(delivery => delivery.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(deliveries))
  }

  updateDelivery(updatedDelivery: Delivery): void {
    const deliveries = this.getDeliveries().map(delivery =>
      delivery.id === updatedDelivery.id ? updatedDelivery : delivery
    );
    localStorage.setItem(this.storageKey, JSON.stringify(deliveries));
  }
}
