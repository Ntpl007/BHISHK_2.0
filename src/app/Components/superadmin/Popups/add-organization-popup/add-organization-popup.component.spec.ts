import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrganizationPopupComponent } from './add-organization-popup.component';

describe('AddOrganizationPopupComponent', () => {
  let component: AddOrganizationPopupComponent;
  let fixture: ComponentFixture<AddOrganizationPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrganizationPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrganizationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
