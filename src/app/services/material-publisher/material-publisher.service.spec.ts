import { TestBed } from '@angular/core/testing';

import { MaterialPublisherService } from './material-publisher.service';

describe('MaterialPublisherService', () => {
  let service: MaterialPublisherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialPublisherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
