import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarManutencaoComponent } from './solicitar-manutencao.component';

describe('SolicitarManutencaoComponent', () => {
  let component: SolicitarManutencaoComponent;
  let fixture: ComponentFixture<SolicitarManutencaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitarManutencaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolicitarManutencaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
