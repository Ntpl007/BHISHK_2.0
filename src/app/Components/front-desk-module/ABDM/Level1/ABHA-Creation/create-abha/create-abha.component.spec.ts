import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateABHAComponent } from './create-abha.component';

describe('CreateABHAComponent', () => {
  let component: CreateABHAComponent;
  let fixture: ComponentFixture<CreateABHAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateABHAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateABHAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
