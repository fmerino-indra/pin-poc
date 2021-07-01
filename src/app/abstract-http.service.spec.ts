import { TestBed } from '@angular/core/testing';

import { AbstractHttpService } from './abstract-http.service';

describe('AbstractHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AbstractHttpService = TestBed.get(AbstractHttpService);
    expect(service).toBeTruthy();
  });
});
