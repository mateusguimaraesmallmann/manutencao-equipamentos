import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocadastroComponent } from './autocadastro.component';

describe('AutocadastroComponent', () => {
  let component: AutocadastroComponent;
  let fixture: ComponentFixture<AutocadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutocadastroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutocadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
