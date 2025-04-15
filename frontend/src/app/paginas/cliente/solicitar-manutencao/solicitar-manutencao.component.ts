import { Component } from '@angular/core';
import { NavbarClienteComponent } from "../../../components/navbar-cliente/navbar-cliente.component";
import { Solicitacao } from '../../../shared/models/solicitacao.model';
import { Status } from '../../../shared/models/solicitacao.model';


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



  processarSolicitacao(descricao_problema: string, categoria: string) {
    /*
    alert('Descrição do problema: ' + descricao_problema + '\nCategoria: ' + categoria);
    window.location.reload();
    */
    this.solicitacao = new Solicitacao('', new Date().toISOString(), descricao_problema, categoria, "joao", this.status);
    console.log(this.solicitacao);
    alert('' + this.solicitacao);
    window.location.reload();
    
  }





}
