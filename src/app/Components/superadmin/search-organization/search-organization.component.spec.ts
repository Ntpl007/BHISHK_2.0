import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchOrganizationComponent } from './search-organization.component';

describe('SearchOrganizationComponent', () => {
  let component: SearchOrganizationComponent;
  let fixture: ComponentFixture<SearchOrganizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchOrganizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
