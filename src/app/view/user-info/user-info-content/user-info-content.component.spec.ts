import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoContentComponent } from './user-info-content.component';

describe('UserInfoContentComponent', () => {
  let component: UserInfoContentComponent;
  let fixture: ComponentFixture<UserInfoContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserInfoContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfoContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
