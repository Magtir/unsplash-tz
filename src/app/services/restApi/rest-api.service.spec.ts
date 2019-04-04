import { TestBed } from '@angular/core/testing';

import { RequestServerService } from './rest-api.service';

describe('RequestServerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestServerService = TestBed.get(RequestServerService);
    expect(service).toBeTruthy();
  });
});
