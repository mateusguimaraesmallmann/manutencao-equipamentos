import { Component } from '@angular/core';
import { NavbarFuncionarioComponent } from "../../../components/navbar-funcionario/navbar-funcionario.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-funcionario',
  standalone: true,
  imports: [NavbarFuncionarioComponent],
  templateUrl: './home-funcionario.component.html',
  styleUrl: './home-funcionario.component.css'
})
export class HomeFuncionarioComponent {
    //pedido: string = 'Pedido';
    constructor(private router: Router){

    }
    goToPage(pageName:string){
      this.router.navigate([`${pageName}`]);
    }
  
    ngOnInit() {
    
    }
  
    visualizarPedido(pedido: string) {
      return alert(pedido);
    }
  

    resgatarServico(){
  
  }

}
