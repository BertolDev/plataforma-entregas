import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DeliveryService } from '../../services/delivery.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Delivery } from '../../models/delivery.model';

@Component({
  selector: 'app-delivery-form',
  templateUrl: './delivery-form.component.html',
  styleUrls: ['./delivery-form.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class DeliveryFormComponent {
  deliveryForm: FormGroup;
  deliveries: Delivery[] = [];
  editingDelivery: Delivery | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private deliveryService: DeliveryService
  ) {
    this.deliveryForm = this.fb.group({
      recipientName: ['', [Validators.required]],
      recipientAddress: ['', [Validators.required]],
      deliveryDate: ['', [Validators.required]],
      status: ['pending', [Validators.required]]
    });
  }

  loadDeliveries() {
    this.deliveries = this.deliveryService.getDeliveries();
    console.log('Entregas carregadas:', this.deliveries);  // Verificar as entregas carregadas
  }

  onSubmit() {
    if (this.deliveryForm.invalid) return;

    const formValue = this.deliveryForm.value;
    console.log('Formulário enviado:', formValue);  // Verifique os dados do formulário

    if (this.editingDelivery) {
      const updatedDelivery: Delivery = {
        ...formValue,
        id: this.editingDelivery.id
      };
      this.deliveryService.updateDelivery(updatedDelivery);
      this.editingDelivery = null;
    } else {
      const newDelivery: Delivery = formValue;
      this.deliveryService.addDelivery(newDelivery);
    }

    this.deliveryForm.reset({ status: 'pending' });
    this.loadDeliveries();
  }

  editDelivery(delivery: Delivery): void {
    this.deliveryForm.patchValue(delivery);
    this.editingDelivery = delivery;
  }

  cancelEdit(): void {
    this.editingDelivery = null;
    this.deliveryForm.reset({ status: 'pending' });
  }

  deleteDelivery(id: number): void {
    this.deliveryService.deleteDelivery(id);
    this.loadDeliveries();
  }
}
