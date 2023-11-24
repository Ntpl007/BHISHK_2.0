import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientRegistrationSearchComponent } from './patient-registration-search.component';

describe('PatientRegistrationSearchComponent', () => {
  let component: PatientRegistrationSearchComponent;
  let fixture: ComponentFixture<PatientRegistrationSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientRegistrationSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientRegistrationSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
