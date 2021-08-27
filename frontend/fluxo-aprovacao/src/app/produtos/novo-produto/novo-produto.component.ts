import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {CurrencyPipe} from '@angular/common'


import { Produto } from './produto';
import { ProdutosService } from '../produtos.service';

@Component({
  selector: 'app-novo-produto',
  templateUrl: './novo-produto.component.html',
  styleUrls: ['./novo-produto.component.css'],
})
export class NovoProdutoComponent implements OnInit {


  constructor(private formBuilder: FormBuilder,private pipe: CurrencyPipe, private produtosService: ProdutosService) {

  }
  produtoForm!: FormGroup;
  ngOnInit(): void {
    this.produtoForm = this.formBuilder.group(
      {
        solicitante: ['', [Validators.required],],
        desc: ['', [Validators.required, Validators.minLength(4)]],
        valor: [
          '',
          [Validators.required],
        ],
      }
    );
    this.produtoForm.valueChanges.subscribe( form => {
      if(form.valor){
        this.produtoForm.patchValue({
          valor: this.pipe.transform(form.valor.replace(/\D/g,'').replace(/0+/,''), 'BRL','symbol')
        }, {emitEvent: false})
      }
    })
  }

  cadastrar() {
    if (this.produtoForm.valid) {
      const novoProduto = this.produtoForm.getRawValue() as Produto;
      this.produtosService.cadastraNovoProduto(novoProduto).subscribe(
        (e) => {
          alert('Produto cadastrado')
        },
        (error) => {
          console.log(error);
        }
      );
      this.produtoForm.reset()
      console.log(novoProduto.valor)

    }
  }
}
