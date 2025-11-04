import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { funcionario2Guard } from './funcionario2.guard';

describe('funcionario2Guard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => funcionario2Guard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
