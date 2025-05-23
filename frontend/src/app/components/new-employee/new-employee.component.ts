import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User, Employee } from '../../models';
import { EmployeeService, UserService } from '../../services';

@Component({
  selector: 'app-new-employee',
  standalone: true,
  imports: [],
  templateUrl: './new-employee.component.html',
  styleUrl: './new-employee.component.css'
})


export class NewEmployeeComponent {
  user: User | null = null;
  employee: Employee | null = null;
  idUser: number | null = null;

  constructor(private employeeService: EmployeeService, private userService: UserService) {

  }

  registerNewEmployee(nome: string, email: string, nascimento: string) {
    console.log('Novo funcionário registrado:');
    console.log('Nome:', nome);
    console.log('Email:', email);
    console.log('Data de Nascimento:', nascimento);
    //alert('Novo funcionário registrado com sucesso!: ' + nome + " " + email + " " + idade);

    // primeiro cria um user, e depois cria um funcionário baseado no user criado
    this.registerNewUser(nome, email);

    if (this.idUser) {
      this.userService.getUserByEmail(email).subscribe((user) => {
        this.employee = {
          id: 87465,  // ID fictício, pois o backend deve gerar um novo ID
          birthday: nascimento, 
          user: user
        }
      });
    }

    if (this.employee) {
      this.employeeService.addEmployee(this.employee).subscribe({
        next: (employee) => {
          this.employee = employee;

        },
        error: (error) => {
          console.error('Erro ao registrar novo funcionário:', error);
          alert('Erro ao registrar novo funcionário. Tente novamente mais tarde.');
        }
      });
    }

  }

  registerNewUser(nome: string, email: string) {
    this.user = {
      id: Math.floor((Math.random() * 10000) + 1), // 
      name: nome,
      email: email,
      role: 1, // 1 = funcionário, 2 = cliente
      employee_id: null,
      client_id: null,
      profile: null,
    }

    if (this.user) {
      this.userService.addUser(this.user).subscribe({
        next: (user) => {
          this.user = user;
          alert('Novo usuário registrado com sucesso!: ' + nome + " " + email );
        },
        error: (error) => {
          console.error('Erro ao registrar novo usuario:', error);
          alert('Erro ao registrar novo usuario. Tente novamente mais tarde.');
        }
      });
    return this.user;
    }
    return null;

  }

}
