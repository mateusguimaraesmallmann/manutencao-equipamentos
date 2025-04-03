import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = "";
  password: string = "";

  constructor(private authService: AuthService) { }

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log("success signIn: ", response)
        console.log("USER LOGGED IN!");
      },
      error: (err) => {
        console.error("Error during signIn", err);
      }
    })
  }

  onSignup() {
    alert("SIGNUP CLICKED");
  }
}
