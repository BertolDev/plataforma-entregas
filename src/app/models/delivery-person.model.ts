export interface DeliveryPerson {
  id: string;
  fullName: string;
  cpf: string;
  phone: string;
  email: string;
  password: string;

  vehicleType: 'Moto' | 'Bike' | 'Carro';
  vehicleModel: string;
  vehiclePlate: string;
  vehicleYear: string;
  vehicleColor: string;

  city: string;
  baseDistrict: string;
  availability?: string; // horários ou dias
}
