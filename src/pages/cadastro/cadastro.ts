import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Carro } from '../../domain/carro/carro';

/*
  Generated class for the Cadastro page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'cadastro.html'
})
export class CadastroPage {

  public carro: Carro;
  public precoTotal: number;

  public nome: string;
  public endereco: string;
  public email: string;
  public data: string = new Date().toISOString();

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.carro = navParams.get('carro');
    this.precoTotal = navParams.get('precoTotal');
  }

  // only fires when the app is loaded, not when the page is shown
  /*ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }*/

  agenda() {
    console.log(this.nome);
  }

}
