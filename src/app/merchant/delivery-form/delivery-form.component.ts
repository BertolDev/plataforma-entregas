import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
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
  imports: [CommonModule, ReactiveFormsModule],
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
      customerName: ['', Validators.required],
      customerPhone: ['', Validators.required],
      deliveryDate: ['', Validators.required],
      status: ['Pendente', Validators.required],
      address: this.fb.group({
        street: ['', Validators.required],
        number: ['', Validators.required],
        district: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        postalCode: ['', Validators.required],
        complement: [''],
      }),
    });
  }

  loadDeliveries(): void {
    this.deliveries = this.deliveryService.getDeliveries();
    console.log('Entregas carregadas:', this.deliveries);
  }

  onSubmit(formDirective: FormGroupDirective): void {
    if (this.deliveryForm.invalid) return;

    const formValue = this.deliveryForm.value;
    console.log('Formulário enviado:', formValue);

    if (this.editingDelivery) {
      const updatedDelivery: Delivery = {
        ...formValue,
        id: this.editingDelivery.id,
      };
      this.deliveryService.updateDelivery(updatedDelivery);
      this.editingDelivery = null;
    } else {
      const newDelivery: Delivery = {
        id: crypto.randomUUID(),
        ...formValue,
        assignedTo: null,
      };
      this.deliveryService.addDelivery(newDelivery);
    }

    this.deliveryForm.reset({ status: 'Pendente' });
    formDirective.resetForm();
    this.loadDeliveries();
  }

  editDelivery(delivery: Delivery): void {
    this.deliveryForm.patchValue(delivery);
    this.editingDelivery = delivery;
  }

  cancelEdit(): void {
    this.editingDelivery = null;
    this.deliveryForm.reset({ status: 'Pendente' });
  }

  deleteDelivery(id: string): void {
    this.deliveryService.deleteDelivery(id);
    this.loadDeliveries();
  }
}
