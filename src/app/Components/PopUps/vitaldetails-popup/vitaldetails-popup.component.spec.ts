import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VitaldetailsPopupComponent } from './vitaldetails-popup.component';

describe('VitaldetailsPopupComponent', () => {
  let component: VitaldetailsPopupComponent;
  let fixture: ComponentFixture<VitaldetailsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VitaldetailsPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VitaldetailsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
