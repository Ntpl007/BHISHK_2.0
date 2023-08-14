import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ABHAInputComponent } from './abha-input.component';

describe('ABHAInputComponent', () => {
  let component: ABHAInputComponent;
  let fixture: ComponentFixture<ABHAInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ABHAInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ABHAInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
