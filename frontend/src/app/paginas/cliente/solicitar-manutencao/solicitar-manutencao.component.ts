import { Component } from '@angular/core';
import { NavbarClienteComponent } from "../../../components/navbar-cliente/navbar-cliente.component";


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
  

  processarSolicitacao(descricao_problema: string, categoria: string) {
    //throw new Error('Method not implemented.');
    return alert('Descrição do problema: ' + descricao_problema + '\nCategoria: ' + categoria);
  }




}
