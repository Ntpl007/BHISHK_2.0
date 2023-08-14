import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ABHAStatusComponent } from './abha-status.component';

describe('ABHAStatusComponent', () => {
  let component: ABHAStatusComponent;
  let fixture: ComponentFixture<ABHAStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ABHAStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ABHAStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
