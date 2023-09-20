import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialityVitalsignComponent } from './speciality-vitalsign.component';

describe('SpecialityVitalsignComponent', () => {
  let component: SpecialityVitalsignComponent;
  let fixture: ComponentFixture<SpecialityVitalsignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialityVitalsignComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialityVitalsignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
