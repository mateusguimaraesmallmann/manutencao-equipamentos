import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil-cliente',
  imports: [],
  templateUrl: './perfil-cliente.component.html',
  styleUrl: './perfil-cliente.component.css'
})
export class PerfilClienteComponent {
  cliente = {
    cpf: '123.456.789-00',
    nome: 'João da Silva',
    email: 'joao@exemplo.com',
    endereco: 'Rua Zero, 123',
    telefone: '99999-9999'
  };

  historicoManutencoes = [
    { id: 1, equipamento: 'Notebook Dell Inspiron', status: 'Concluído', data: '12/09/2025' },
    { id: 2, equipamento: 'Impressora HP LaserJet', status: 'Em andamento', data: '03/10/2025' },
    { id: 3, equipamento: 'Monitor LG 24"', status: 'Aguardando peças', data: '06/10/2025' }
  ];

  avaliacoes = [
    { nota: 5, comentario: 'Serviço excelente e rápido!' },
    { nota: 4, comentario: 'Atendimento bom, mas o prazo poderia ser menor.' },
    { nota: 3, comentario: 'Tive que retornar duas vezes, mas resolveram.' }
  ];

  novaAvaliacao = { nota: 0, comentario: '' };

  editarDados() {
    alert('Função de edição em desenvolvimento!');
  }

  contarEquipamentosEmAberto(): number {
    return this.historicoManutencoes.filter(m => m.status !== 'Concluído').length;
  }

  calcularMediaAvaliacoes(): number {
    if (this.avaliacoes.length === 0) return 0;
    const soma = this.avaliacoes.reduce((acc, a) => acc + a.nota, 0);
    return +(soma / this.avaliacoes.length).toFixed(1);
  }

  adicionarAvaliacao() {
    if (this.novaAvaliacao.nota > 0 && this.novaAvaliacao.comentario.trim() !== '') {
      this.avaliacoes.push({ ...this.novaAvaliacao });
      this.novaAvaliacao = { nota: 0, comentario: '' };
      alert('Avaliação adicionada com sucesso!');
    } else {
      alert('Preencha a nota e o comentário antes de enviar.');
    }
  }
}
