import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorFacilityTariffComponent } from './doctor-facility-tariff.component';

describe('DoctorFacilityTariffComponent', () => {
  let component: DoctorFacilityTariffComponent;
  let fixture: ComponentFixture<DoctorFacilityTariffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorFacilityTariffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorFacilityTariffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
