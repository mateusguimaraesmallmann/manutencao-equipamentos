import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaClienteComponent } from './pagina-cliente.component';

describe('PaginaClienteComponent', () => {
  let component: PaginaClienteComponent;
  let fixture: ComponentFixture<PaginaClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
