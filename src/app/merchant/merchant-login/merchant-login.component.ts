import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MerchantService } from '../../shared/services/merchant.service';

@Component({
  selector: 'app-merchant-login',
  templateUrl: './merchant-login.component.html',
  styleUrls: ['./merchant-login.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class MerchantLoginComponent {
  loginForm: FormGroup;
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private merchantService: MerchantService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;
    const merchant = this.merchantService.login(email, password); // Aqui pegamos o lojista ou null

    if (merchant) {
      this.router.navigate(['/merchant/delivery-form']); // Se encontrar o lojista, redireciona
    } else {
      this.loginError = 'E-mail ou senha inválidos.'; // Caso contrário, mostra o erro
    }
  }
}
