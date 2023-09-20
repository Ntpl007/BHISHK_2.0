import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotAbhaVerifyAadhaarOtpComponent } from './forgot-abha-verify-aadhaar-otp.component';

describe('ForgotAbhaVerifyAadhaarOtpComponent', () => {
  let component: ForgotAbhaVerifyAadhaarOtpComponent;
  let fixture: ComponentFixture<ForgotAbhaVerifyAadhaarOtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotAbhaVerifyAadhaarOtpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotAbhaVerifyAadhaarOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
