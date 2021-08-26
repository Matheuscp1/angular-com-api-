import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NovoProdutoComponent } from './novo-produto/novo-produto.component';



const routes: Routes = [
  {
    path: '',
    component: NovoProdutoComponent,

  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProdutosRoutingModule {}
