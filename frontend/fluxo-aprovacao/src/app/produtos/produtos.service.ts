import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { TokenService } from 'src/app/autenticacao/token.service';

import { Produto } from './novo-produto/produto';


@Injectable({
  providedIn: 'root',
})
export class ProdutosService {
  constructor(private http: HttpClient, private tokenService: TokenService) { }

  cadastraNovoProduto(novoProduto: Produto) {
    const token = this.tokenService.retornaToken();
    const headers = new HttpHeaders().append('x-acess-token',token);
    return this.http.post('http://localhost:8080/produtos', {novoProduto},{headers});
  }

  listarProdutos(){
    const token = this.tokenService.retornaToken();
    const headers = new HttpHeaders().append('x-acess-token',token);
    return this.http.get<[Produto]>('http://localhost:8080/produtos', {headers});
  }
}
