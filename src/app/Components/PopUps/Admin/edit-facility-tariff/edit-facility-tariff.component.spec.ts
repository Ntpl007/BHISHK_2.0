import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFacilityTariffComponent } from './edit-facility-tariff.component';

describe('EditFacilityTariffComponent', () => {
  let component: EditFacilityTariffComponent;
  let fixture: ComponentFixture<EditFacilityTariffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFacilityTariffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFacilityTariffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
