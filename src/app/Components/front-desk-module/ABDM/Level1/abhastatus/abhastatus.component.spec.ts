import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbhastatusComponent } from './abhastatus.component';

describe('AbhastatusComponent', () => {
  let component: AbhastatusComponent;
  let fixture: ComponentFixture<AbhastatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbhastatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbhastatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
