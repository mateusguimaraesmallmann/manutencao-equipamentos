import { Component } from '@angular/core';
import { NavbarClienteComponent } from "../../../components/navbar-cliente/navbar-cliente.component";
import { Solicitacao } from '../../../shared/models/solicitacao.model';
import { Status } from '../../../shared/models/solicitacao.model';
import { SolicitacaoService } from '../../../services/solicitacao.service';


@Component({
  selector: 'app-solicitar-manutencao',
  standalone: true,
  imports: [NavbarClienteComponent],
  templateUrl: './solicitar-manutencao.component.html',
  styleUrl: './solicitar-manutencao.component.css'
})


export class SolicitarManutencaoComponent {
  descricao_problema: string = '';
  categoria: string = '';
  tipo_categoria: string = '';
  solicitacao!: Solicitacao | null;
  status: Status = Status.ABERTA;

  constructor(private solicitacaoService: SolicitacaoService,) {

  }


  processarSolicitacao(descricao_problema: string, categoria: string) {

    //não ta sendo feita a verificação de qual cliente ta logado, ta só inserindo no cliente João (ABCD)
    if (descricao_problema === '' || categoria === '') {
      alert('Preencha todos os campos!');
      return;
    }
    this.solicitacaoService.criarSolicitacao(descricao_problema, categoria, "ABCD").subscribe({
      next: (solicitacao) => {
        this.solicitacao = solicitacao;
        console.log(this.solicitacao);
        alert('Solicitação criada com sucesso!');
        window.location.reload();
      }, error: (error) => {
        console.error('Erro ao criar solicitação:', error);
        alert('Erro ao criar solicitação:' + error.message);
      },
    })
  };

}
