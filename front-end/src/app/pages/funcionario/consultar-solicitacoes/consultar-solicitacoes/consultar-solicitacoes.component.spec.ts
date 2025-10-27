import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarSolicitacoesComponent } from './consultar-solicitacoes.component';

describe('ConsultarSolicitacoesComponent', () => {
  let component: ConsultarSolicitacoesComponent;
  let fixture: ComponentFixture<ConsultarSolicitacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarSolicitacoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarSolicitacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
