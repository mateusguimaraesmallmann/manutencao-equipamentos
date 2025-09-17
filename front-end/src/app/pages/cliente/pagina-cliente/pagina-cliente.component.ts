import { Component, OnInit } from '@angular/core';
import { Solicitacao, EstadoSolicitacao } from '../../../shared';
import { SolicitacoesService } from '../../../services/solicitacoes.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-pagina-cliente',
  imports: [CommonModule, TableModule, ButtonModule],
  templateUrl: './pagina-cliente.component.html',
  styleUrl: './pagina-cliente.component.css'
})
export class ClienteComponent implements OnInit {

  solicitacoes: Solicitacao[] = [];

  constructor(private solicitacoesService: SolicitacoesService) {}

  ngOnInit(): void {
      this.solicitacoesService.getSolicitacoesCliente()
        .subscribe(data => {
          this.solicitacoes = data.sort((a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      });
  }

  limitarDescricao(desc: string): string{
    return desc.length > 30 ? desc.substring(0, 30) + '...' : desc;
  }

  getAcaoBotao(estado: string): string {
    switch(estado){
      case 'ORÇADA': return 'Aprovar/Rejeitar Serviço';
      case 'REJEITADA': return 'Resgatar Serviço';
      case 'ARRUMADA': return 'Pagar Serviço';
      default: return '';
    }
  }

  visualizarSolicitacao(id: string){
    console.log('Visualizar Solicitação', id);
  }

  acaoSolicitacao(solicitacao: Solicitacao) {
    console.log('Ação para', solicitacao.estado);
  }

}
