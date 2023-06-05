import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMembershipComponent } from './user-membership.component';

describe('UserMembershipComponent', () => {
  let component: UserMembershipComponent;
  let fixture: ComponentFixture<UserMembershipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserMembershipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
