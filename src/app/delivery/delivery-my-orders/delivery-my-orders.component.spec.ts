import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryMyOrdersComponent } from './delivery-my-orders.component';

describe('DeliveryMyOrdersComponent', () => {
  let component: DeliveryMyOrdersComponent;
  let fixture: ComponentFixture<DeliveryMyOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryMyOrdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryMyOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
