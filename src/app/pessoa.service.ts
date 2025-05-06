import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pessoa } from './pessoas.model';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  private apiUrl = 'http://localhost:8080/pessoa';

  constructor(private http: HttpClient) {}

  getPessoas(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(this.apiUrl);
  }

  adicionarPessoa(pessoa: Pessoa): Observable<void> {
    return this.http.post<void>(this.apiUrl, pessoa);
  }

  atualizarPessoa(id: number, pessoa: Pessoa): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, pessoa); // corrigido
  }
  
  excluirPessoa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`); // corrigido
  }  
  
}
