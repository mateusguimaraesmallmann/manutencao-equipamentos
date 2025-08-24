import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar/navbar.component';

@Component({
  selector: 'app-inicial',
  imports:[NavbarComponent],
  standalone: true,
  templateUrl: './inicial.component.html',
  styleUrl: './inicial.component.css'
})
export class InicialComponent {

}
