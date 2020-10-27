import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationChoiceComponent } from './authentication-choice.component';

describe('AuthenticationChoiceComponent', () => {
  let component: AuthenticationChoiceComponent;
  let fixture: ComponentFixture<AuthenticationChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthenticationChoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticationChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
