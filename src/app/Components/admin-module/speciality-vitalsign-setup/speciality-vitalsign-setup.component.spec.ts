import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialityVitalsignSetupComponent } from './speciality-vitalsign-setup.component';

describe('SpecialityVitalsignSetupComponent', () => {
  let component: SpecialityVitalsignSetupComponent;
  let fixture: ComponentFixture<SpecialityVitalsignSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialityVitalsignSetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialityVitalsignSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
