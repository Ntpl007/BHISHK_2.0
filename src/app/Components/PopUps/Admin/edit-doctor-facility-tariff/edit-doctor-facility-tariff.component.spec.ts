import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDoctorFacilityTariffComponent } from './edit-doctor-facility-tariff.component';

describe('EditDoctorFacilityTariffComponent', () => {
  let component: EditDoctorFacilityTariffComponent;
  let fixture: ComponentFixture<EditDoctorFacilityTariffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDoctorFacilityTariffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDoctorFacilityTariffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
