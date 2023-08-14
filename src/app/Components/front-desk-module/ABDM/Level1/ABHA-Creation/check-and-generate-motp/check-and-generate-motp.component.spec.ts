import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckAndGenerateMotpComponent } from './check-and-generate-motp.component';

describe('CheckAndGenerateMotpComponent', () => {
  let component: CheckAndGenerateMotpComponent;
  let fixture: ComponentFixture<CheckAndGenerateMotpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckAndGenerateMotpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckAndGenerateMotpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
