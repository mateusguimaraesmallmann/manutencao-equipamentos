import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioReceitasComponent } from './relatorio-receitas.component';

describe('RelatorioReceitasComponent', () => {
  let component: RelatorioReceitasComponent;
  let fixture: ComponentFixture<RelatorioReceitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatorioReceitasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RelatorioReceitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
