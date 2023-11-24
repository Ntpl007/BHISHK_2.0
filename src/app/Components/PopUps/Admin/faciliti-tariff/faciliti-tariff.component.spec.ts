import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitiTariffComponent } from './faciliti-tariff.component';

describe('FacilitiTariffComponent', () => {
  let component: FacilitiTariffComponent;
  let fixture: ComponentFixture<FacilitiTariffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacilitiTariffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilitiTariffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
