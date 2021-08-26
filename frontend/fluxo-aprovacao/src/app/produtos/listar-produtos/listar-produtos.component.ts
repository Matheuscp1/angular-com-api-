import { Produto } from './../novo-produto/produto';
import { Component, OnInit } from '@angular/core';
import { ProdutosService } from '../produtos.service';

@Component({
  selector: 'app-listar-produtos',
  templateUrl: './listar-produtos.component.html',
  styleUrls: ['./listar-produtos.component.css']
})
export class ListarProdutosComponent implements OnInit {
  produtos?:[Produto]
  constructor(private produtosService: ProdutosService) { }

  ngOnInit(): void {
    this.produtosService.listarProdutos().subscribe(
      (e) => {
        this.produtos = e
       console.log(this.produtos)
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
