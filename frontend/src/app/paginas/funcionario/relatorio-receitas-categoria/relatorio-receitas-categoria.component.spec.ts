import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioReceitasCategoriaComponent } from './relatorio-receitas-categoria.component';

describe('RelatorioReceitasCategoriaComponent', () => {
  let component: RelatorioReceitasCategoriaComponent;
  let fixture: ComponentFixture<RelatorioReceitasCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatorioReceitasCategoriaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RelatorioReceitasCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
