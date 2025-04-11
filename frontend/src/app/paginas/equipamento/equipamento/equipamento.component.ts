import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface Categoria {
  id: number;
  nome: string;
}

@Component({
  selector: 'app-equipamento',
  standalone: true,
  imports: [],
  templateUrl: './equipamento.component.html',
  styleUrl: './equipamento.component.css'
})

export class EquipamentoComponent implements OnInit {

  categorias: Categoria[] = [];
  formCategoria: FormGroup;
  editando: boolean = false;
  categoriaSelecionadaId: number | null = null;

  constructor(private fb: FormBuilder) {
    this.formCategoria = this.fb.group({
      nome: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.categorias = [
      { id: 1, nome: 'Notebook' },
      { id: 2, nome: 'Impressora' },
      { id: 3, nome: 'Desktop' },
      { id: 4, nome: 'Microfone' },
    ];
  }

  salvar(): void {
    if (this.formCategoria.invalid) return;

    const nome = this.formCategoria.value.nome.trim();

    if (this.editando && this.categoriaSelecionadaId !== null) {
      const index = this.categorias.findIndex(c => c.id === this.categoriaSelecionadaId);
      if (index > -1) {
        this.categorias[index].nome = nome;
      }
    } else {
      const novaCategoria: Categoria = {
        id: this.categorias.length + 1,
        nome
      };
      this.categorias.push(novaCategoria);
    }

    this.cancelar();
  }

  editar(categoria: Categoria): void {
    this.formCategoria.setValue({ nome: categoria.nome });
    this.editando = true;
    this.categoriaSelecionadaId = categoria.id;
  }

  excluir(id: number): void {
    this.categorias = this.categorias.filter(c => c.id !== id);
    this.cancelar();
  }

  cancelar(): void {
    this.formCategoria.reset();
    this.editando = false;
    this.categoriaSelecionadaId = null;
  }

}
