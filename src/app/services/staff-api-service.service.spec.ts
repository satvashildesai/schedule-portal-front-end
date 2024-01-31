import { TestBed } from '@angular/core/testing';

import { StaffApiServiceService } from './staff-api-service.service';

describe('StaffApiServiceService', () => {
  let service: StaffApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaffApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
