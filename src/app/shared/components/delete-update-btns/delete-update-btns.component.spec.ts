import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUpdateBtnsComponent } from './delete-update-btns.component';

describe('DeleteUpdateBtnsComponent', () => {
  let component: DeleteUpdateBtnsComponent;
  let fixture: ComponentFixture<DeleteUpdateBtnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteUpdateBtnsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteUpdateBtnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
