import { TestBed } from '@angular/core/testing';

import { AdminAuthGuard } from '../../shared/services/admin-auth.guard';

describe('AdminAuthGuard', () => {
  let guard: AdminAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
