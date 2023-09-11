import { TestBed } from '@angular/core/testing';

import { DialogcommunicationService } from './dialogcommunication.service';

describe('DialogcommunicationService', () => {
  let service: DialogcommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogcommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
