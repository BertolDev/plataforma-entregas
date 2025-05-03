import { Injectable } from '@angular/core';
import { DeliveryPerson } from '../models/delivery-person.model';

@Injectable({ providedIn: 'root' })
export class DeliveryPersonService {
  private readonly STORAGE_KEY = 'registeredDeliveryPeople';
  private readonly SESSION_KEY = 'loggedDeliveryPerson';

  register(person: Omit<DeliveryPerson, 'id'>): void {
    const all = this.getAll();
    const newPerson = { ...person, id: crypto.randomUUID() };
    all.push(newPerson);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(all));
  }

  getAll(): DeliveryPerson[] {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  login(email: string, password: string): DeliveryPerson | null {
    const all = this.getAll();
    const found = all.find(p => p.email === email && p.password === password);
    if (found) {
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(found));
      return found;
    }
    return null;
  }

  getLoggedPerson(): DeliveryPerson | null {
    const raw = localStorage.getItem(this.SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  logout(): void {
    localStorage.removeItem(this.SESSION_KEY);
  }
}
