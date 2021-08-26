import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CartaoModule } from 'src/app/componentes/cartao/cartao.module';
import { NovoProdutoComponent } from './novo-produto/novo-produto.component';
import { ProdutosRoutingModule } from './produtos-routing.module';



@NgModule({
  declarations: [
    NovoProdutoComponent,
  ],
  imports: [CommonModule, ProdutosRoutingModule, CartaoModule, SharedModule],
  providers: [CurrencyPipe]
})
export class ProdutosModule {}
