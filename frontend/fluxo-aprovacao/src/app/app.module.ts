import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CabecalhoModule } from './componentes/cabecalho/cabecalho.module';

import { AutenticacaoModule } from './autenticacao/autenticacao.module';
import { CurrencyPipe } from '@angular/common';
registerLocaleData(localePt)
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CabecalhoModule,
    AutenticacaoModule,
  ],
  providers: [CurrencyPipe, {
    provide: LOCALE_ID,
    useValue: 'pt-br'
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
