import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {CurrencyPipe} from '@angular/common'


import { Produto } from './produto';
import { ProdutosService } from '../produtos.service';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.css'],
})
export class EditarProdutoComponent implements OnInit {
  produtoId?:number
  produto?:Produto
  constructor(private activatedRoute: ActivatedRoute,private formBuilder: FormBuilder, private produtoService: ProdutosService,
    private pipe: CurrencyPipe) {

  }
  editForm!: FormGroup;
  ngOnInit(): void {
    this.produtoId = parseInt( this.activatedRoute.snapshot.params.produtoId)
    this.pegarValores(this.produtoId)
    this.editForm = this.formBuilder.group(
      {
        solicitante: ['', [Validators.required],],
        desc: ['', [Validators.required, Validators.minLength(4)]],
        valor: [
          '',
          [Validators.required],
        ],
        obs: [''],
        aprovado: ['', [Validators.required]]
      }
    );



  }

  pegarValores(id:number){
    this.produtoService.listarProdutoId(id).subscribe((valor) => {
      this.produto = valor
      let valorPipe = this.pipe.transform(this.produto.valor, 'BRL','symbol')
      this.editForm = this.formBuilder.group(
        {
          solicitante: [this.produto?.solicitante, [Validators.required],],
          desc: [this.produto?.desc, [Validators.required, Validators.minLength(4)]],
          valor: [
            valorPipe,
            [Validators.required],
          ],
          obs: [this.produto?.obs],
          aprovado: [this.produto?.aprovado, [Validators.required]]
        }
      );
    })
  }

  editar() {
    if (this.editForm.valid) {
      const produtoEditado = this.editForm.getRawValue() as Produto;
      this.produtoService.editarProdutoId(this.produtoId!, produtoEditado).subscribe(e =>{
        alert(e)
      })
    }
  }

  onchange($event: any){
    console.log($event)
    if($event == "Aprovado"){
      this.editForm.get('obs')?.addValidators(Validators.required)
    }if($event == "Reprovado"){
      this.editForm.get('obs')?.clearValidators()
    }

  }
}
