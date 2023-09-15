import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OPNursingComponent } from './op-nursing.component';

describe('OPNursingComponent', () => {
  let component: OPNursingComponent;
  let fixture: ComponentFixture<OPNursingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OPNursingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OPNursingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
