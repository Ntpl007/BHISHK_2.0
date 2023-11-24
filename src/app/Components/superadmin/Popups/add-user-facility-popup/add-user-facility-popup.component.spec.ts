import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserFacilityPopupComponent } from './add-user-facility-popup.component';

describe('AddUserFacilityPopupComponent', () => {
  let component: AddUserFacilityPopupComponent;
  let fixture: ComponentFixture<AddUserFacilityPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserFacilityPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUserFacilityPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
