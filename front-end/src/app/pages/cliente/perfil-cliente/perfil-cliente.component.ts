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

  editarDados() {
    alert('Função de edição em desenvolvimento!');
  }

  contarEquipamentosEmAberto(): number {
    return this.historicoManutencoes.filter(m => m.status !== 'Concluído').length;
  }
}
