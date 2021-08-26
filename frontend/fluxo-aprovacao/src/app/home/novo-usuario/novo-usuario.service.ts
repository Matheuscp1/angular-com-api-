import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NovoUsuario } from './novo-usuario';



@Injectable({
  providedIn: 'root',
})
export class NovoUsuarioService {
  constructor(private http: HttpClient) {}

  cadastraNovoUsuario(novoUsuario: NovoUsuario) {
    return this.http.post('http://localhost:8080/user', novoUsuario);
  }

  verificaUsuarioExistente(email: string) {
    return this.http.get(`http://localhost:8080/user/${email}`);
  }
}
