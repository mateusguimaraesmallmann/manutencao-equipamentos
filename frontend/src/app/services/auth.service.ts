import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser = {};
  private apiUrl = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  loggedIn(): Boolean {
    return Object.keys(this.currentUser).length === 0;
  }

  login(email: string, password: string): Observable<any> {
    const loginUrl = `${this.apiUrl}/login`

    const data = { email, password }

    return this.http.post(loginUrl, data).pipe(
      tap((response) => {
        this.currentUser = response;
        console.log("User logged in!");
      })
    );
  }
}
