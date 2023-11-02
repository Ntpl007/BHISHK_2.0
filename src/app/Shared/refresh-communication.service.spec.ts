import { TestBed } from '@angular/core/testing';

import { RefreshCommunicationService } from './refresh-communication.service';

describe('RefreshCommunicationService', () => {
  let service: RefreshCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefreshCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
