import { TestBed } from '@angular/core/testing';

import { StaffShiftAssignApiServiceService } from './staff-shift-assign-api-service.service';

describe('StaffShiftAssignApiServiceService', () => {
  let service: StaffShiftAssignApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaffShiftAssignApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
