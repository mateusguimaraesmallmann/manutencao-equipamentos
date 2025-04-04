import { Component } from '@angular/core';
import { NavbarClienteComponent } from '../../../components/navbar-cliente/navbar-cliente.component';

@Component({
  selector: 'app-home-cliente',
  standalone: true,
  imports: [NavbarClienteComponent],
  templateUrl: './home-cliente.component.html',
  styleUrl: './home-cliente.component.css'
})
export class HomeClienteComponent {
  //pedido: string = 'Pedido';
  constructor() {
    // Inicialização do componente
  }

  ngOnInit() {
  

  }

  visualizarPedido(pedido: string) {
    return alert(pedido);
  }

  aprovarPedido() {
  }

  rejeitarPedido() {
  }
  
  pagarServico(){

  }
  resgatarServico(){

  }

}
