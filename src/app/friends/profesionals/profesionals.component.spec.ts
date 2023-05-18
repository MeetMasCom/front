import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesionalsComponent } from './profesionals.component';

describe('ProfesionalsComponent', () => {
  let component: ProfesionalsComponent;
  let fixture: ComponentFixture<ProfesionalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfesionalsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfesionalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
