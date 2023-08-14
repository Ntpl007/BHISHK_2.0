import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbdmHomeComponent } from './abdm-home.component';

describe('AbdmHomeComponent', () => {
  let component: AbdmHomeComponent;
  let fixture: ComponentFixture<AbdmHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbdmHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbdmHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
