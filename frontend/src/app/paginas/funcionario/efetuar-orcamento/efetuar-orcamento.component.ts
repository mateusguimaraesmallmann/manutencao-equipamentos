import { Component } from '@angular/core';
import { NavbarFuncionarioComponent } from "../../../components/navbar-funcionario/navbar-funcionario.component";

@Component({
  selector: 'app-efetuar-orcamento',
  standalone: true,
  imports: [NavbarFuncionarioComponent],
  templateUrl: './efetuar-orcamento.component.html',
  styleUrl: './efetuar-orcamento.component.css'
})
export class EfetuarOrcamentoComponent {

  constructor(){

  }

  efetuarOrcamento(){
    alert('Orçamento efetuado')
  }

}
