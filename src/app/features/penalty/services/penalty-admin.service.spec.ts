import { TestBed } from '@angular/core/testing';

import { PenaltyAdminService } from './penalty-admin.service';

describe('PenaltyAdminService', () => {
  let service: PenaltyAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PenaltyAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
