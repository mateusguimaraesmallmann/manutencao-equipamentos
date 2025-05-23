import { Injectable } from '@angular/core';
import { User } from '../models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})


export class UserService {
  private apiUrl = 'http://localhost:3000/users'; // URL da API
  constructor(private http: HttpClient) { }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}?email=${email}`);
  }

  getUserByName(name: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}?name=${name}`);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

}