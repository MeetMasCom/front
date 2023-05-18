import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsLayoutComponent } from './ads-layout.component';

describe('AdsLayoutComponent', () => {
  let component: AdsLayoutComponent;
  let fixture: ComponentFixture<AdsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdsLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
