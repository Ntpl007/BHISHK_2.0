import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OPNursingStationComponent } from './opnursing-station.component';

describe('OPNursingStationComponent', () => {
  let component: OPNursingStationComponent;
  let fixture: ComponentFixture<OPNursingStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OPNursingStationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OPNursingStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
