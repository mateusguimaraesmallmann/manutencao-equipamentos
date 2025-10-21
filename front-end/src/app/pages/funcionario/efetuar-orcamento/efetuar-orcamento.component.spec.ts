import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EfetuarOrcamentoComponent } from './efetuar-orcamento.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('EfetuarOrcamentoComponent (PrimeNG)', () => {
  let component: EfetuarOrcamentoComponent;
  let fixture: ComponentFixture<EfetuarOrcamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EfetuarOrcamentoComponent,
        NoopAnimationsModule,
        ReactiveFormsModule
      ],
      providers: [
        MessageService,
        ConfirmationService,
        DialogService,
        { provide: DynamicDialogRef, useValue: {} },
        provideHttpClientTesting() // ✅ substitui HttpClientTestingModule (Angular 17+)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EfetuarOrcamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a reactive form initialized', () => {
    expect(component.form).toBeDefined();
    expect(component.form.get('valor')).toBeTruthy();
  });

  it('should mark form invalid when valor is empty', () => {
    component.form.get('valor')?.setValue(null);
    expect(component.form.invalid).toBeTrue();
  });

  it('should mark form valid when valor >= 0.01', () => {
    component.form.get('valor')?.setValue(100);
    expect(component.form.valid).toBeTrue();
  });
});
