import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessmenComponent } from './businessmen.component';

describe('BusinessmenComponent', () => {
  let component: BusinessmenComponent;
  let fixture: ComponentFixture<BusinessmenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessmenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessmenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
