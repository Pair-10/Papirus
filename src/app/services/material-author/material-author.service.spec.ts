import { TestBed } from '@angular/core/testing';

import { MaterialAuthorService } from './material-author.service';

describe('MaterialAuthorService', () => {
  let service: MaterialAuthorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialAuthorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
