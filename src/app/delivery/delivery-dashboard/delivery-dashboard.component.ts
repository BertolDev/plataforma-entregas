import { Component, OnInit } from '@angular/core';
import { DeliveryPersonService } from '../../services/delivery-person.service';
import { DeliveryService } from '../../services/delivery.service'; // Serviço para entregas
import { Delivery } from '../../models/delivery.model'; // Modelo da entrega
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Importando o Router para navegação

@Component({
  selector: 'app-delivery-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delivery-dashboard.component.html',
  styleUrls: ['./delivery-dashboard.component.scss'],
})
export class DeliveryDashboardComponent implements OnInit {
  deliveries: Delivery[] = [];
  activeDelivery: Delivery | null = null;
  loggedDeliveryPersonId: string | null = null;
  loggedDeliveryPersonName: string = '';

  constructor(
    private deliveryPersonService: DeliveryPersonService,
    private deliveryService: DeliveryService,
    private router: Router // Injetando o Router para navegação
  ) {}

  ngOnInit(): void {
    const loggedPerson = this.deliveryPersonService.getLoggedPerson();
    if (loggedPerson) {
      this.loggedDeliveryPersonId = loggedPerson.id;
      this.loggedDeliveryPersonName = loggedPerson.fullName.split(' ')[0];
      this.loadDeliveries(); // Carregar entregas de acordo com o status do entregador
    }
  }

  loadDeliveries(): void {
    const allDeliveries = this.deliveryService.getDeliveries();

    // Verifica se o entregador tem uma entrega ativa
    const active = allDeliveries.find(
      (d) =>
        d.assignedTo === this.loggedDeliveryPersonId &&
        d.status !== 'Finalizada'
    );

    if (active) {
      this.activeDelivery = active; // Atribui a entrega ativa
      this.deliveries = []; // Não exibe as entregas disponíveis
    } else {
      this.deliveries = allDeliveries.filter(
        (delivery) => !delivery.assignedTo // Exibe apenas entregas disponíveis
      );
      this.activeDelivery = null; // Nenhuma entrega ativa
    }
  }

  assignDelivery(delivery: Delivery): void {
    // Atribui a entrega ao entregador
    if (this.loggedDeliveryPersonId) {
      delivery.assignedTo = this.loggedDeliveryPersonId;
      this.deliveryService.updateDelivery(delivery); // Atualiza a entrega
      this.loadDeliveries(); // Recarrega as entregas
    }
  }

  completeDelivery(): void {
    if (this.activeDelivery) {
      this.activeDelivery.status = 'Finalizada'; // Marca como entregue
      this.deliveryService.updateDelivery(this.activeDelivery); // Atualiza a entrega
      this.loadDeliveries(); // Recarrega a lista de entregas
    }
  }

  // Função para redirecionar para o componente "Minhas Entregas"
  goToMyOrders(): void {
    this.router.navigate(['/delivery/my-orders']); // Corrigido para a rota correta
  }
}
