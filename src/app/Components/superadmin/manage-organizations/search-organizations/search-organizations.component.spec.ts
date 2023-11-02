import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchOrganizationsComponent } from './search-organizations.component';

describe('SearchOrganizationsComponent', () => {
  let component: SearchOrganizationsComponent;
  let fixture: ComponentFixture<SearchOrganizationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchOrganizationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchOrganizationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
