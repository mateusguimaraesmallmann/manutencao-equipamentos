import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

const API_BASE = 'http://localhost:8080';
const API_REGISTER = `${API_BASE}/register`;

export interface RegisterRequest {
  cpf: string;
  nome: string;
  email: string;
  telefone: string;
  cep: string;
  rua: string;
  bairro: string;
  numero: string;
  complemento?: string;
  cidade: string;
  estado: string;
}

export interface EnderecoDTO {
  cep: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  complemento?: string;
}
export interface ClienteDTO {
  id: string | number;
  nome: string;
  email: string;
  telefone: string;
  endereco: EnderecoDTO;
  createdAt: string;
  ativo: boolean;
}

@Injectable({ providedIn: 'root' })
export class AutocadastroService {
  constructor(private http: HttpClient) {}
  register(dto: RegisterRequest): Observable<ClienteDTO> {
    return this.http.post<ClienteDTO>(API_REGISTER, dto).pipe(
      catchError(err => throwError(() => err))
    );
  }
}