import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAbhaNumberComponent } from './show-abha-number.component';

describe('ShowAbhaNumberComponent', () => {
  let component: ShowAbhaNumberComponent;
  let fixture: ComponentFixture<ShowAbhaNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAbhaNumberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowAbhaNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
