import { TestBed, inject } from '@angular/core/testing';

import { PensionersService } from './pensioners.service';

describe('PensionersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PensionersService]
    });
  });

  it('should be created', inject([PensionersService], (service: PensionersService) => {
    expect(service).toBeTruthy();
  }));
});
