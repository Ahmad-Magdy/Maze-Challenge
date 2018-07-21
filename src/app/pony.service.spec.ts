import { TestBed, inject } from '@angular/core/testing';

import { PonyService } from './pony.service';

describe('PonyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PonyService]
    });
  });

  it('should be created', inject([PonyService], (service: PonyService) => {
    expect(service).toBeTruthy();
  }));
});
