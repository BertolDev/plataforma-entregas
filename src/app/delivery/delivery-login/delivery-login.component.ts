import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DeliveryPerson } from '../../models/delivery-person.model';
import { DeliveryPersonService } from '../../services/delivery-person.service';

@Component({
  selector: 'app-delivery-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './delivery-login.component.html',
  styleUrls: ['./delivery-login.component.scss'],
})
export class DeliveryLoginComponent {
  fb = inject(FormBuilder);
  router = inject(Router);
  deliveryPersonService = inject(DeliveryPersonService);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  errorMessage: string = '';

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;
    const logged = this.deliveryPersonService.login(email, password);
    if (logged) {
      this.router.navigate(['/delivery/list']);
    } else {
      this.errorMessage = 'Credenciais inválidas. Tente novamente.';
    }
  }
}
