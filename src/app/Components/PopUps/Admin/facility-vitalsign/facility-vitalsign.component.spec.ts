import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityVitalsignComponent } from './facility-vitalsign.component';

describe('FacilityVitalsignComponent', () => {
  let component: FacilityVitalsignComponent;
  let fixture: ComponentFixture<FacilityVitalsignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacilityVitalsignComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilityVitalsignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
