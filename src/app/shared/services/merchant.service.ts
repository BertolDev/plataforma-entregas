import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Merchant } from '../../models/merchant.model';

@Injectable({
  providedIn: 'root',
})
export class MerchantService {
  private storageKey = 'registeredMerchants';

  registerMerchant(merchant: Merchant): void {
    const merchants = this.getMerchants();
    merchant.id = Date.now();
    merchants.push(merchant);
    localStorage.setItem(this.storageKey, JSON.stringify(merchants));
  }

  getMerchants(): Merchant[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  login(email: string, password: string): Merchant | null {
    const merchants = this.getMerchants();
    const found = merchants.find(m => m.email === email && m.password === password);
    return found || null;
  }
}
