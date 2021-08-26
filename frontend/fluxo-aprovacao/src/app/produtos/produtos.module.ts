import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { NovoProdutoComponent } from './novo-produto/novo-produto.component';
import { ProdutosRoutingModule } from './produtos-routing.module';
import { ListarProdutosComponent } from './listar-produtos/listar-produtos.component';



@NgModule({
  declarations: [
    NovoProdutoComponent,
    ListarProdutosComponent,
  ],
  imports: [CommonModule, ProdutosRoutingModule, SharedModule],
  providers: [CurrencyPipe]
})
export class ProdutosModule {}
