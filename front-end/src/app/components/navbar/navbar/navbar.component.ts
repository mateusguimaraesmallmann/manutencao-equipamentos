import { Component } from '@angular/core';
import {ToolbarModule} from 'primeng/toolbar';


@Component({
  selector: 'app-navbar',
  imports: [
    ToolbarModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
