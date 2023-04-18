import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFadComponent } from './register-fad.component';

describe('RegisterFadComponent', () => {
  let component: RegisterFadComponent;
  let fixture: ComponentFixture<RegisterFadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterFadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterFadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
