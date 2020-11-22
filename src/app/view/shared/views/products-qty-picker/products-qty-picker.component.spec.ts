import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsQtyPickerComponent } from './products-qty-picker.component';

describe('ProductsQtyPickerComponent', () => {
  let component: ProductsQtyPickerComponent;
  let fixture: ComponentFixture<ProductsQtyPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsQtyPickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsQtyPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
