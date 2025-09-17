import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarOrcamentoComponent } from './mostrar-orcamento.component';

describe('MostrarOrcamentoComponent', () => {
  let component: MostrarOrcamentoComponent;
  let fixture: ComponentFixture<MostrarOrcamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarOrcamentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarOrcamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
