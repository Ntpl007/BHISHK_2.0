import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ABHAProfileComponent } from './abha-profile.component';

describe('ABHAProfileComponent', () => {
  let component: ABHAProfileComponent;
  let fixture: ComponentFixture<ABHAProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ABHAProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ABHAProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
