import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delivery-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './delivery-register.component.html',  // Importa o HTML
  styleUrls: ['./delivery-register.component.scss'] // Importa o SCSS
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
