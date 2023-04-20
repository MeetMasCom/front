import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyHotelComponent } from './verify-hotel.component';

describe('VerifyHotelComponent', () => {
  let component: VerifyHotelComponent;
  let fixture: ComponentFixture<VerifyHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyHotelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
