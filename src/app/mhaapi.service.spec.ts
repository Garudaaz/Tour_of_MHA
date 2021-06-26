import { TestBed } from '@angular/core/testing';

import { MhaapiService } from './mhaapi.service';

describe('MhaapiService', () => {
  let service: MhaapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MhaapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
