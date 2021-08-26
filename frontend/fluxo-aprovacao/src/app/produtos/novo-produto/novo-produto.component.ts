import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {CurrencyPipe} from '@angular/common'


import { Produto } from './produto';

@Component({
  selector: 'app-novo-produto',
  templateUrl: './novo-produto.component.html',
  styleUrls: ['./novo-produto.component.css'],
})
export class NovoProdutoComponent implements OnInit {


  constructor(private activatedRoute: ActivatedRoute,     private formBuilder: FormBuilder,
    private pipe: CurrencyPipe) {

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
          valor: this.pipe.transform(form.valor.replace(/\D/g,'').replace(/^0+/,''), 'BRL','symbol','4.2-2')
        }, {emitEvent: false})
      }
    })
  }

  cadastrar() {
    if (this.produtoForm.valid) {
      const novoUsuario = this.produtoForm.getRawValue() as Produto;
      this.produtoForm.reset()
      console.log(novoUsuario.desc)

    }
  }
}
