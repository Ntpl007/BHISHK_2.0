import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpdSearchComponent } from './opd-search.component';

describe('OpdSearchComponent', () => {
  let component: OpdSearchComponent;
  let fixture: ComponentFixture<OpdSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpdSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpdSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
