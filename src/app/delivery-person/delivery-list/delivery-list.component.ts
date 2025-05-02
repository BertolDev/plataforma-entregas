import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryService } from '../../shared/services/delivery.service';
import { Delivery } from '../../models/delivery.model';
import { Router } from '@angular/router';

interface LoggedInDeliveryPerson {
  email: string;
}

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class DeliveryListComponent implements OnInit {
  deliveries: Delivery[] = [];
  loggedInDeliveryPerson: LoggedInDeliveryPerson | null = null;
  logoutMessage: string | null = null;

  constructor(
    private deliveryService: DeliveryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Verifica se o entregador está logado
    const loggedPerson = localStorage.getItem('loggedDeliveryPerson');
    if (loggedPerson) {
      this.loggedInDeliveryPerson = JSON.parse(loggedPerson);
    }

    if (!this.loggedInDeliveryPerson) {
      this.router.navigate(['/delivery/login']); // Redireciona para login se não estiver logado
      return;
    }

    // Carrega as entregas disponíveis
    this.deliveries = this.deliveryService.getDeliveries();
  }

  logout() {
    // Remover dados do entregador logado
    localStorage.removeItem('loggedDeliveryPerson');
    // Define a mensagem de logout
    this.logoutMessage = 'Você foi desconectado com sucesso!';

    // Redireciona para a tela de login
    setTimeout(() => {
      this.router.navigate(['/delivery/login']);
    }, 2000); // Espera 2 segundos para mostrar a mensagem antes de redirecionar
  }
}
