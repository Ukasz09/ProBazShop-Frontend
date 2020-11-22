import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartProductRowComponent } from './cart-product-row.component';

describe('CartProductRowComponent', () => {
  let component: CartProductRowComponent;
  let fixture: ComponentFixture<CartProductRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartProductRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartProductRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
