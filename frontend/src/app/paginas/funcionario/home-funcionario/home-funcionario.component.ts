import { Component } from '@angular/core';
import { NavbarFuncionarioComponent } from "../../../components/navbar-funcionario/navbar-funcionario.component";

@Component({
  selector: 'app-home-funcionario',
  standalone: true,
  imports: [NavbarFuncionarioComponent],
  templateUrl: './home-funcionario.component.html',
  styleUrl: './home-funcionario.component.css'
})
export class HomeFuncionarioComponent {
    //pedido: string = 'Pedido';
    constructor() {
      // Inicialização do componente
    }
  
    ngOnInit() {
    
  
    }
  
    visualizarPedido(pedido: string) {
      return alert(pedido);
    }
  
    efetuarOrcamento() {
    }
  
    rejeitarPedido() {
    }
    
    pagarServico(){
  
    }
    resgatarServico(){
  
    }

}
