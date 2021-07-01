import { TestBed } from '@angular/core/testing';

import { PinDeliveryService } from './pin-delivery.service';

describe('PinDeliveryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PinDeliveryService = TestBed.get(PinDeliveryService);
    expect(service).toBeTruthy();
  });
});
