import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delivery-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './delivery-login.component.html',
  styleUrls: ['./delivery-login.component.scss']
})
export class DeliveryLoginComponent {
  isLogin = true;

  // Dados do formulário de login
  loginEmail = '';
  loginPassword = '';

  // Dados do formulário de cadastro
  registerName = '';
  registerEmail = '';
  registerPassword = '';

  constructor(private router: Router) {}

  toggleMode() {
    this.isLogin = !this.isLogin;
  }

  onSubmitLogin() {
    // Simula o processo de login, salvando no localStorage
    console.log('Login:', this.loginEmail, this.loginPassword);

    // Aqui você pode salvar no localStorage após login com sucesso
    localStorage.setItem('loggedDeliveryPerson', JSON.stringify({ email: this.loginEmail }));

    // Simula redirecionamento após login
    this.router.navigate(['/delivery/list']);
  }

  onSubmitRegister() {
    console.log('Cadastro:', this.registerName, this.registerEmail, this.registerPassword);

    // Após o cadastro, pode redirecionar ou voltar para o login
    this.isLogin = true;
  }
}
