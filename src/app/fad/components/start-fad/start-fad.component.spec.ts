import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartFadComponent } from './start-fad.component';

describe('StartFadComponent', () => {
  let component: StartFadComponent;
  let fixture: ComponentFixture<StartFadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartFadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartFadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
