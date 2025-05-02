export interface Delivery {
  id: number;
  recipientName: string;
  recipientAddress: string;
  status: string;
  merchantId: number; // <- essencial para saber de quem é a entrega
  deliveryDate: string;
}
