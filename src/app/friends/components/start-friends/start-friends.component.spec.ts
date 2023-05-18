import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartFriendsComponent } from './start-friends.component';

describe('StartFriendsComponent', () => {
  let component: StartFriendsComponent;
  let fixture: ComponentFixture<StartFriendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartFriendsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
