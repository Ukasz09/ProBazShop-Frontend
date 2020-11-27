import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRowComponentComponent } from './user-row-component.component';

describe('UserRowComponentComponent', () => {
  let component: UserRowComponentComponent;
  let fixture: ComponentFixture<UserRowComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRowComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRowComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
