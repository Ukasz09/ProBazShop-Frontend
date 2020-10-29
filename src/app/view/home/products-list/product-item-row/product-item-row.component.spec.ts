import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductItemRowComponent } from './product-item-row.component';

describe('ProductItemRowComponent', () => {
  let component: ProductItemRowComponent;
  let fixture: ComponentFixture<ProductItemRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductItemRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductItemRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
