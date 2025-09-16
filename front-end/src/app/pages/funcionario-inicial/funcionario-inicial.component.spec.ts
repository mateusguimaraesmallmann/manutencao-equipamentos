import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioInicialComponent } from './funcionario-inicial.component';

describe('FuncionarioInicialComponent', () => {
  let component: FuncionarioInicialComponent;
  let fixture: ComponentFixture<FuncionarioInicialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionarioInicialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncionarioInicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
