import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarProdutosComponent } from './listar-produtos/listar-produtos.component';
import { NovoProdutoComponent } from './novo-produto/novo-produto.component';



const routes: Routes = [
  {
    path: '',
    component: NovoProdutoComponent,

  },
  {
    path: 'listar-produtos',
    component: ListarProdutosComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProdutosRoutingModule {}
