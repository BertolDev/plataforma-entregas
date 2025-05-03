import { Injectable } from '@angular/core';
import { Delivery } from '../models/delivery.model'; // Modelo de entrega
import { DeliveryPerson } from '../models/delivery-person.model';  // Modelo de entregador

@Injectable({
  providedIn: 'root',
})
export class DeliveryService {
  private deliveryStorageKey = 'registeredDeliveries';
  private deliveryPersonStorageKey = 'registeredDeliveryPersons';

  // Métodos relacionados a entregas
  addDelivery(delivery: Omit<Delivery, 'id'>): void {
    const deliveries = this.getDeliveries();
    const newDelivery = {
      ...delivery,
      id: Date.now(),
    };
    deliveries.push(newDelivery);
    localStorage.setItem(this.deliveryStorageKey, JSON.stringify(deliveries));
  }

  getDeliveries(): Delivery[] {
    const data = localStorage.getItem(this.deliveryStorageKey);
    return data ? JSON.parse(data) : [];
  }

  deleteDelivery(id: number): void {
    const deliveries = this.getDeliveries().filter(delivery => delivery.id !== id);
    localStorage.setItem(this.deliveryStorageKey, JSON.stringify(deliveries));
  }

  updateDelivery(updatedDelivery: Delivery): void {
    const deliveries = this.getDeliveries().map(delivery =>
      delivery.id === updatedDelivery.id ? updatedDelivery : delivery
    );
    localStorage.setItem(this.deliveryStorageKey, JSON.stringify(deliveries));
  }

  // Métodos relacionados aos entregadores
  addDeliveryPerson(deliveryPerson: Omit<DeliveryPerson, 'id'>): void {
    const deliveryPersons = this.getDeliveryPersons();
    const newDeliveryPerson = {
      ...deliveryPerson,
      id: Date.now().toString(),
    };
    deliveryPersons.push(newDeliveryPerson);
    localStorage.setItem(this.deliveryPersonStorageKey, JSON.stringify(deliveryPersons));
  }

  getDeliveryPersons(): DeliveryPerson[] {
    const data = localStorage.getItem(this.deliveryPersonStorageKey);
    return data ? JSON.parse(data) : [];
  }

  updateDeliveryPerson(updatedDeliveryPerson: DeliveryPerson): void {
    const deliveryPersons = this.getDeliveryPersons().map(person =>
      person.id === updatedDeliveryPerson.id ? updatedDeliveryPerson : person
    );
    localStorage.setItem(this.deliveryPersonStorageKey, JSON.stringify(deliveryPersons));
  }

  getDeliveryPersonById(id: string): DeliveryPerson | undefined {
    const deliveryPersons = this.getDeliveryPersons();
    return deliveryPersons.find(person => person.id === id);
  }
}
