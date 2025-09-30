import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil-cliente',
  imports: [],
  templateUrl: './perfil-cliente.component.html',
  styleUrl: './perfil-cliente.component.css'
})
export class PerfilClienteComponent {
  cliente = {
    cpf: '123.456.789-00',
    nome: 'João da silva',
    email: 'joao@exemplo.com',
    endereco: 'Rua Zero, 123',
    telefone: '999999999'

  };

}
