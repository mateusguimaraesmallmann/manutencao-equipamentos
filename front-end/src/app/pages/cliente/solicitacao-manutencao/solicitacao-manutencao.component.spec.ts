
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

  it('should have an invalid form initially', () => {
    expect(component.form.valid).toBeFalse();
  });

  it('should validate required fields', () => {
    const form = component.form;
    form.setValue({
      equipamento: '',
      categoria: '',
      defeito: ''
    });
    expect(form.valid).toBeFalse();
    expect(form.get('equipamento')?.hasError('required')).toBeTrue();
    expect(form.get('categoria')?.hasError('required')).toBeTrue();
    expect(form.get('defeito')?.hasError('required')).toBeTrue();
  });

  it('should make form valid when all fields are filled', () => {
    const form = component.form;
    form.setValue({
      equipamento: 'Impressora HP LaserJet 1020',
      categoria: 'Impressoras',
      defeito: 'Não liga'
    });
    expect(form.valid).toBeTrue();
  });

});
