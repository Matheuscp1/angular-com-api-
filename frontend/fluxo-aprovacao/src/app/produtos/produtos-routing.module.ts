import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditarProdutoComponent } from './editar-produto/editar-produto.component';
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
  {
    path: ':produtoId',
    component: EditarProdutoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProdutosRoutingModule {}
