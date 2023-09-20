import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindAbhaComponent } from './find-abha.component';

describe('FindAbhaComponent', () => {
  let component: FindAbhaComponent;
  let fixture: ComponentFixture<FindAbhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindAbhaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindAbhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
