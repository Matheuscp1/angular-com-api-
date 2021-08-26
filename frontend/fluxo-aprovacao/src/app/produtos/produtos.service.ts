import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, mapTo } from 'rxjs/operators';
import { TokenService } from 'src/app/autenticacao/token.service';




@Injectable({
  providedIn: 'root',
})
export class ProdutosService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

}
