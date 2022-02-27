import { TestBed } from '@angular/core/testing';

import { TesttService } from './testt.service';

describe('TesttService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TesttService = TestBed.get(TesttService);
    expect(service).toBeTruthy();
  });
});
