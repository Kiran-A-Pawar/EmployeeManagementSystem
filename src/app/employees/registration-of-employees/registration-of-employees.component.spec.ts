import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationOfEmployeesComponent } from './registration-of-employees.component';

describe('RegistrationOfEmployeesComponent', () => {
  let component: RegistrationOfEmployeesComponent;
  let fixture: ComponentFixture<RegistrationOfEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationOfEmployeesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationOfEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
