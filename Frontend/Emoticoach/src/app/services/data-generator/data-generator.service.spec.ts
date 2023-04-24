import { TestBed } from '@angular/core/testing';

import { DataGeneratorService } from './data-generator.service';

describe('DataGeneratorService', () => {
  let service: DataGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
