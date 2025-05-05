import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-delivery-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './delivery-card.component.html',
  styleUrls: ['./delivery-card.component.scss'],
})
export class DeliveryCardComponent {
  @Input() entrega: any;
  @Input() showActions: boolean = false;
  @Input() showDetailsButton: boolean = false;
  @Input() showConcludeButton: boolean = false;

  @Output() concluir = new EventEmitter<void>();
}
