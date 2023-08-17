import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferAppointmentComponent } from './transfer-appointment.component';

describe('TransferAppointmentComponent', () => {
  let component: TransferAppointmentComponent;
  let fixture: ComponentFixture<TransferAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferAppointmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
