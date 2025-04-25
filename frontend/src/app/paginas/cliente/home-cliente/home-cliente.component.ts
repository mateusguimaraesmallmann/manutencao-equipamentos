import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarClienteComponent } from '../../../components/navbar-cliente/navbar-cliente.component';

@Component({
  selector: 'app-home-cliente',
  standalone: true,
  imports: [NavbarClienteComponent],
  templateUrl: './home-cliente.component.html',
  styleUrl: './home-cliente.component.css'
})
export class HomeClienteComponent {
  constructor(private router: Router) {}

  ngOnInit() {
    

  }

  visualizarPedido(pedido: string) {
    return alert(pedido);
  }

  aprovarPedido() {
    this.router.navigate(['/aprovar-servico']);
  }

  rejeitarPedido() {}
  pagarServico() {}
  resgatarServico() {}
}
