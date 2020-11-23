import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderedProductRowComponent } from './ordered-product-row.component';

describe('OrderedProductRowComponent', () => {
  let component: OrderedProductRowComponent;
  let fixture: ComponentFixture<OrderedProductRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderedProductRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderedProductRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
