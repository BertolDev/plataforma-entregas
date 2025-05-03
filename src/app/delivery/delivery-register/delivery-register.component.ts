import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delivery-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="register-container">
      <h2>Cadastro de Entregador</h2>

      <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
        <div class="form-section">
          <label>Nome completo</label>
          <input type="text" formControlName="fullName" />

          <label>CPF</label>
          <input type="text" formControlName="cpf" />

          <label>Telefone</label>
          <input type="tel" formControlName="phone" />

          <label>E-mail</label>
          <input type="email" formControlName="email" />

          <label>Senha</label>
          <input type="password" formControlName="password" />
        </div>

        <div class="form-section">
          <h3>Informações do Veículo</h3>

          <label>Tipo</label>
          <select formControlName="vehicleType">
            <option value="Moto">Moto</option>
            <option value="Bike">Bike</option>
            <option value="Carro">Carro</option>
          </select>

          <label>Modelo</label>
          <input type="text" formControlName="vehicleModel" />

          <label>Placa</label>
          <input type="text" formControlName="vehiclePlate" />

          <label>Ano</label>
          <input type="text" formControlName="vehicleYear" />

          <label>Cor</label>
          <input type="text" formControlName="vehicleColor" />
        </div>

        <div class="form-section">
          <h3>Localização e Disponibilidade</h3>

          <label>Cidade</label>
          <input type="text" formControlName="city" />

          <label>Bairro Base</label>
          <input type="text" formControlName="baseDistrict" />

          <label>Disponibilidade</label>
          <input type="text" formControlName="availability" placeholder="Ex: Dias úteis à tarde" />
        </div>

        <button type="submit" [disabled]="registerForm.invalid">Cadastrar</button>
      </form>
    </div>
  `,
  styles: [`
    .register-container {
      max-width: 600px;
      margin: auto;
      padding: 1rem;
    }

    h2, h3 {
      margin-bottom: 0.5rem;
    }

    .form-section {
      margin-bottom: 1.5rem;
    }

    label {
      display: block;
      margin-top: 0.5rem;
    }

    input, select {
      width: 100%;
      padding: 0.4rem;
      margin-top: 0.2rem;
      box-sizing: border-box;
    }

    button {
      margin-top: 1rem;
      padding: 0.5rem 1rem;
    }
  `]
})
export class DeliveryRegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.minLength(11)]],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],

      vehicleType: ['Moto', Validators.required],
      vehicleModel: ['', Validators.required],
      vehiclePlate: ['', Validators.required],
      vehicleYear: ['', Validators.required],
      vehicleColor: ['', Validators.required],

      city: ['', Validators.required],
      baseDistrict: ['', Validators.required],
      availability: ['']
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const registeredData = this.registerForm.value;
      const existing = JSON.parse(localStorage.getItem('registeredDeliveryPeople') || '[]');
      const newData = {
        ...registeredData,
        id: Date.now().toString()
      };

      localStorage.setItem('registeredDeliveryPeople', JSON.stringify([...existing, newData]));
      alert('Cadastro realizado com sucesso!');
      this.router.navigate(['/delivery/login']);
    }
  }
}
