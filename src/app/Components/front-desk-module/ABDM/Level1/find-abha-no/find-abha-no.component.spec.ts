import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindABHANoComponent } from './find-abha-no.component';

describe('FindABHANoComponent', () => {
  let component: FindABHANoComponent;
  let fixture: ComponentFixture<FindABHANoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindABHANoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindABHANoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
