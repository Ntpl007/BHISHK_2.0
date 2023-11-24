import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpdbillingforexistingpatientComponent } from './opdbillingforexistingpatient.component';

describe('OpdbillingforexistingpatientComponent', () => {
  let component: OpdbillingforexistingpatientComponent;
  let fixture: ComponentFixture<OpdbillingforexistingpatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpdbillingforexistingpatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpdbillingforexistingpatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
