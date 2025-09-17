
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitacaoManutencaoComponent } from './solicitacao-manutencao.component';

describe('SolicitacaoManutencaoComponent', () => {
  let component: SolicitacaoManutencaoComponent;
  let fixture: ComponentFixture<SolicitacaoManutencaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitacaoManutencaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolicitacaoManutencaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
