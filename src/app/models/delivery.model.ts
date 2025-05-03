export interface Delivery {
  id: number;
  recipientName: string;
  recipientAddress: string;
  status: string;
  merchantId: string; // ID do lojista
  deliveryDate: string;
  assignedTo?: string; // ID do entregador atribuído (opcional)
  delivered?: boolean;
}
