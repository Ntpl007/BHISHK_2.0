import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyAadhaarComponent } from './verify-aadhaar.component';

describe('VerifyAadhaarComponent', () => {
  let component: VerifyAadhaarComponent;
  let fixture: ComponentFixture<VerifyAadhaarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyAadhaarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyAadhaarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
