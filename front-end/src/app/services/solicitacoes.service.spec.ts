import { TestBed } from '@angular/core/testing';

import { SolicitacoesService } from './solicitacoes.service';

describe('SolicitacoesService', () => {
  let service: SolicitacoesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitacoesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
