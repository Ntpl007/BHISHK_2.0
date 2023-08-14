import { TestBed } from '@angular/core/testing';

import { HimsServiceService } from './hims-service.service';

describe('HimsServiceService', () => {
  let service: HimsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HimsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
