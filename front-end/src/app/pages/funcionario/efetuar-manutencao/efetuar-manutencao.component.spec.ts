import { TestBed } from '@angular/core/testing';
import { EfetuarManutencaoComponent } from './efetuar-manutencao.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { SolicitacoesService } from '../../../services/solicitacoes.service';

class SolicitacoesServiceMock {
  getById() { return undefined; }
  efetuarManutencao() { return of(undefined); }
  redirecionarManutencao() { return of(undefined); }
}

describe('EfetuarManutencaoComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EfetuarManutencaoComponent, RouterTestingModule, NoopAnimationsModule],
      providers: [{ provide: SolicitacoesService, useClass: SolicitacoesServiceMock }]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(EfetuarManutencaoComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
