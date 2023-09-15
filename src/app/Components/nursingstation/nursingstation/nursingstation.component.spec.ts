import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NursingstationComponent } from './nursingstation.component';

describe('NursingstationComponent', () => {
  let component: NursingstationComponent;
  let fixture: ComponentFixture<NursingstationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NursingstationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NursingstationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
