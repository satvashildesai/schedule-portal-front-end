import { TestBed } from '@angular/core/testing';

import { ShiftApiServiceService } from './shift-api-service.service';

describe('ShiftApiServiceService', () => {
  let service: ShiftApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShiftApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
