import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioDialogComponent } from './funcionario-dialog.component';

describe('FuncionarioDialogComponent', () => {
  let component: FuncionarioDialogComponent;
  let fixture: ComponentFixture<FuncionarioDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionarioDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncionarioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
