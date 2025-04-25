import { Component } from '@angular/core';
import { Solicitacao } from '../../../shared/models/solicitacao.model';
import { SolicitacaoService } from '../../../services/solicitacao.service';

@Component({
  selector: 'app-home-funcionario',
  standalone: true,
  imports: [],
  templateUrl: './home-funcionario.component.html',
  styleUrl: './home-funcionario.component.css'
})
export class HomeFuncionarioComponent {
  //pedido: string = 'Pedido';
  solicitacao!: Solicitacao[] | null;

  constructor(private solicitacaoService: SolicitacaoService,) {

  }

  ngOnInit() {
    this.pegarSolicitacaoPorStatus("Aberta");
    //this.pegarSolicitacaoPorFuncionarioID("YYYY");
    //this.pegarSolicitacaoPorID(this.arg1);

  }

  visualizarPedido(pedido: string) {
    return alert(pedido);
  }

  efetuarOrcamento() {
    //só ta redirecionando para efetuar-orcamento
    //tem que fazer as funcoes corretas
    window.location.href = '/efetuar-orcamento';
    
  }

  rejeitarPedido() {
  }

  pagarServico() {

  }
  resgatarServico() {

  }

  //funcao que pega a lista de solicitacoes de acordo com o status, no caso só os status ABERTA
  //no html ainda nao ta sendo usada essa funcao 
  pegarSolicitacaoPorStatus(status_atual: string) {
    console.log("status: " + status_atual);

    this.solicitacaoService.getSolicitacaoByStatus(status_atual).subscribe({
      next: (solicitacao) => {
        this.solicitacao = solicitacao;
        console.log(this.solicitacao);
      }, error: (error) => {
        console.error('Erro ao buscar solicitação:', error);
        alert('Erro ao buscar solicitação:' + error.message);
      },
    })
  }

}
