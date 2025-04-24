import { Component } from '@angular/core';
import { NavbarClienteComponent } from "../../../components/navbar-cliente/navbar-cliente.component";

@Component({
  selector: 'app-mostrar-orcamento',
  standalone: true,
  imports: [NavbarClienteComponent],
  templateUrl: './mostrar-orcamento.component.html',
  styleUrl: './mostrar-orcamento.component.css'
})
export class MostrarOrcamentoComponent {
  visualizarPedido(arg0: string) {
    throw new Error('Method not implemented.');
  }


  rejeitarOrcamento() {
    //só testar pra criar um objeto de solicitacao e salvar no BD

  }






  visualizarOrcamento(arg0: string) {
    throw new Error('Method not implemented.');
  }
  aprovarOrcamento() {
    throw new Error('Method not implemented.');
  }


}
