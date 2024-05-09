import { TestBed } from '@angular/core/testing';

import { MyMaterialService } from './my-material.service';

describe('MyMaterialService', () => {
  let service: MyMaterialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyMaterialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
