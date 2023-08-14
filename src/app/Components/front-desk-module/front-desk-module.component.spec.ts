import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontDeskModuleComponent } from './front-desk-module.component';

describe('FrontDeskModuleComponent', () => {
  let component: FrontDeskModuleComponent;
  let fixture: ComponentFixture<FrontDeskModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontDeskModuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontDeskModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
