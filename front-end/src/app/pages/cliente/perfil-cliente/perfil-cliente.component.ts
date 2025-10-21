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
    telefone: '99999-9999',
    dataCadastro: '15/08/2024',
    vip: true,
    preferenciasContato: {
      email: true,
      whatsapp: true,
      sms: false
    }
  };

  historicoManutencoes = [
    { id: 1, equipamento: 'Notebook Dell Inspiron', status: 'Concluído', data: '12/09/2025' },
    { id: 2, equipamento: 'Impressora HP LaserJet', status: 'Em andamento', data: '03/10/2025' },
    { id: 3, equipamento: 'Monitor LG 24"', status: 'Aguardando peças', data: '06/10/2025' }
  ];

  equipamentosRegistrados = [
    { nome: 'Notebook Dell Inspiron', numeroSerie: 'ABC12345', garantia: 'Sim', ultimaManutencao: '12/09/2025' },
    { nome: 'Impressora HP LaserJet', numeroSerie: 'HP998877', garantia: 'Não', ultimaManutencao: '03/10/2025' },
    { nome: 'Monitor LG 24"', numeroSerie: 'LG54321', garantia: 'Sim', ultimaManutencao: '06/10/2025' }
  ];

  mostrarEquipamentos = false;

  alternarExibicaoEquipamentos() {
    this.mostrarEquipamentos = !this.mostrarEquipamentos;
  }

  editarDados() {
    alert('Função de edição de dados ainda não disponível.');
  }

  getStatusVip(): string {
    return this.cliente.vip ? 'Cliente VIP 💎' : 'Cliente Comum';
  }

  contarEquipamentosEmAberto(): number {
    return this.historicoManutencoes.filter(m => m.status !== 'Concluído').length;
  }

  getPreferenciasContato(): string {
    const prefs = this.cliente.preferenciasContato;
    const lista: string[] = [];
    if (prefs.email) lista.push('E-mail');
    if (prefs.whatsapp) lista.push('WhatsApp');
    if (prefs.sms) lista.push('SMS');
    return lista.join(', ');
  }
}
