import { TestBed, inject } from '@angular/core/testing';

import { PonyMovementService } from './pony-movement.service';

describe('PonyMovementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PonyMovementService]
    });
  });

  it('should be created', inject([PonyMovementService], (service: PonyMovementService) => {
    expect(service).toBeTruthy();
  }));
});
