import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityTariffComponent } from './facility-tariff.component';

describe('FacilityTariffComponent', () => {
  let component: FacilityTariffComponent;
  let fixture: ComponentFixture<FacilityTariffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacilityTariffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilityTariffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
