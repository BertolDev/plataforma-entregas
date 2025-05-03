import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MerchantService } from '../../services/merchant.service';
import { Merchant } from '../../models/merchant.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-merchant-register',
  templateUrl: './merchant-register.component.html',
  styleUrls: ['./merchant-register.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule] // ✅ IMPORTA AQUI
})
export class MerchantRegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private merchantService: MerchantService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      address: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) return;

    const merchant: Merchant = this.registerForm.value;
    this.merchantService.registerMerchant(merchant);
    alert('Cadastro realizado com sucesso!');
    this.router.navigate(['/merchant/login']);
  }
}
