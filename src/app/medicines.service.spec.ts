import { TestBed, inject } from '@angular/core/testing';

import { MedicinesService } from './medicines.service';

describe('MedicinesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MedicinesService]
    });
  });

  it('should be created', inject([MedicinesService], (service: MedicinesService) => {
    expect(service).toBeTruthy();
  }));
});
