import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDoctorFacilityTariffComponent } from './create-doctor-facility-tariff.component';

describe('CreateDoctorFacilityTariffComponent', () => {
  let component: CreateDoctorFacilityTariffComponent;
  let fixture: ComponentFixture<CreateDoctorFacilityTariffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDoctorFacilityTariffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDoctorFacilityTariffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
