import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorTempleteComponent } from './doctor-templete.component';

describe('DoctorTempleteComponent', () => {
  let component: DoctorTempleteComponent;
  let fixture: ComponentFixture<DoctorTempleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorTempleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorTempleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
