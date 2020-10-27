import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUiGeneratorComponent } from './form-ui-generator.component';

describe('FormUiGeneratorComponent', () => {
  let component: FormUiGeneratorComponent;
  let fixture: ComponentFixture<FormUiGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormUiGeneratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUiGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
