export interface Delivery {
  id: string;
  customerName: string;
  customerPhone: string;
  deliveryDate: string;
  status: 'Pendente' | 'Em andamento' | 'Finalizada';
  address: {
    street: string;
    number: string;
    district: string;
    city: string;
    state: string;
    postalCode: string;
    complement?: string;
  };
  assignedTo: string | null;
}
