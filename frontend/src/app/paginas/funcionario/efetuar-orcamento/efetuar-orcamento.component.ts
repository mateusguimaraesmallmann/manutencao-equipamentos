import { Component } from '@angular/core';
import { Status } from '../../../shared/models/solicitacao.model';
import { Solicitacao } from '../../../shared/models/solicitacao.model';
import { SolicitacaoService } from '../../../services/solicitacao.service';
import { NavbarFuncionarioComponent } from "../../../components/navbar-funcionario/navbar-funcionario.component";
import { Funcionario } from '../../../shared/models/funcionario.model';

@Component({
  selector: 'app-efetuar-orcamento',
  standalone: true,
  imports: [NavbarFuncionarioComponent],
  templateUrl: './efetuar-orcamento.component.html',
  styleUrl: './efetuar-orcamento.component.css'
})
export class EfetuarOrcamentoComponent {

  solicitacao!: Solicitacao[] | null;
  solicitacaoSelecionada!: Solicitacao | null;
  status: Status = Status.ABERTA;
  valor_orcamento: number = 0;
  id_solicitacao: string = "4pzJQq3";
  id_funcionario: string = "YYYY";
  arg1: string = "iA9GNPN";
  arg2: number = 999;
  arg3: string = "YYYY";

  constructor(private solicitacaoService: SolicitacaoService,) {

  }

  ngOnInit() {
    this.pegarSolicitacaoPorStatus("Aberta");
    //this.pegarSolicitacaoPorFuncionarioID("YYYY");
    //this.pegarSolicitacaoPorID(this.arg1);

  }

  processarOrcamento(valor_orcamento: number) {
    //não ta sendo feita a verificação de qual cliente ta logado, ta só inserindo no cliente João (ABCD)
    if (valor_orcamento === 0) {
      alert('Preencha todos os campos!');
      return;
    }
    this.solicitacaoService.adicionarOrcamento(this.id_solicitacao, valor_orcamento, this.id_funcionario).subscribe({
      next: (solicitacao) => {
        this.solicitacaoSelecionada = solicitacao;
        console.log(this.solicitacao);
        alert('Orçamento adicionado com sucesso!');
        //window.location.reload();
        window.location.href = '/funcionario';
      }, error: (error) => {
        console.error('Erro ao criar solicitação:', error);
        alert('Erro ao criar solicitação:' + error.message);
      },
    })
  }

  /* debug
  mostrarValor(valor_orcamento: number) {
    console.log(valor_orcamento);
    alert(valor_orcamento.toString());
  }

  */

  pegarSolicitacaoPorID(id: string) {
    this.solicitacaoService.getSolicitacaoByID(id).subscribe({
      next: (solicitacao) => {
        this.solicitacaoSelecionada = solicitacao;
        console.log(this.solicitacaoSelecionada);
      }, error: (error) => {
        console.error('Erro ao buscar solicitação:', error);
        alert('Erro ao buscar solicitação:' + error.message);
      },
    })
  }

  pegarSolicitacaoPorFuncionarioID(id: string) {
    this.solicitacaoService.getSolicitacaoByFuncionarioID(id).subscribe({
      next: (solicitacao) => {
        this.solicitacao = solicitacao;
        console.log(this.solicitacao);
      }, error: (error) => {
        console.error('Erro ao buscar solicitação:', error);
        alert('Erro ao buscar solicitação:' + error.message);
      },
    })
  }

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

  addOrcamento(id: string = "125G", valor_orcamento: number = 999, funcionario_orcamento_id: string = "YYYY") {
    this.solicitacaoService.adicionarOrcamento(id, valor_orcamento, funcionario_orcamento_id).subscribe({
      next: (solicitacao) => {
        this.solicitacaoSelecionada = solicitacao;
        console.log(this.solicitacao);
        alert('Orçamento adicionado com sucesso!');
      }, error: (error) => {
        console.error('Erro ao adicionar orçamento:', error);
        alert('Erro ao adicionar orçamento:' + error.message);
      },
    })

  }

}
