import { TestBed } from '@angular/core/testing';

import { notAuthGuard } from './notauth.guard';

describe('notAuthGuard', () => {
  let guard: notAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(notAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
