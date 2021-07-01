import { TestBed } from '@angular/core/testing';

import { PinReminderService } from './pin-reminder.service';

describe('PinReminderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PinReminderService = TestBed.get(PinReminderService);
    expect(service).toBeTruthy();
  });
});
