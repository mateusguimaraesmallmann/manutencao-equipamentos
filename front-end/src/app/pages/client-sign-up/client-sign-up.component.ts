import { Component } from '@angular/core';
import {SignUpFormComponent} from './componets/sign-up-form/sign-up-form.component';

@Component({
  selector: 'app-client-sign-up',
  standalone: true,
  templateUrl: './client-sign-up.component.html',
  imports: [
    SignUpFormComponent
  ],
  styleUrl: './client-sign-up.component.css'
})
export class ClientSignUpComponent {

}
