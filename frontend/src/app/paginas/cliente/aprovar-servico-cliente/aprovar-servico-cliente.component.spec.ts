import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprovarServicoClienteComponent } from './aprovar-servico-cliente.component';

describe('AprovarServicoClienteComponent', () => {
  let component: AprovarServicoClienteComponent;
  let fixture: ComponentFixture<AprovarServicoClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AprovarServicoClienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AprovarServicoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
