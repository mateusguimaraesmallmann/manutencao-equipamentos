import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EfetuarOrcamentoComponent } from './efetuar-orcamento.component';

describe('EfetuarOrcamentoComponent', () => {
  let component: EfetuarOrcamentoComponent;
  let fixture: ComponentFixture<EfetuarOrcamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EfetuarOrcamentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EfetuarOrcamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
