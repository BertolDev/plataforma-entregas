export interface Delivery {
  id: number;
  recipientName: string;
  recipientAddress: string;
  status: string;
  merchantId: number;
  deliveryDate: string;
  deliveryPersonId?: string; // se quiser vincular o entregador à entrega
}
