import { Config } from '../../app/app.config';
import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Loading } from 'ionic-angular/components/loading/loading';
import { Http } from '@angular/http';

import { EscolhaPage } from '../escolha/escolha';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  public carros;
  private loader: Loading;

  constructor(
    public navCtrl: NavController,
    private http: Http,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {
  }

  public ngOnInit(): void {
    this.loader = this.loadingCtrl.create({
      content: 'Buscando novos carros. Aguarde ...'
    });

    this.loader.present();
    this.getCarros();
  }

  private async getCarros() {
    try {
      this.carros = await this.http.get(Config.apiBase).map(res => res.json()).toPromise();
      this.loader.dismiss();
    } catch (err) {
      console.error(err);
      this.loader.dismiss();
      this.createFailureAlert();
    }
  }

  private createFailureAlert() {
    this.alertCtrl.create({
      title: 'Falha na conexão',
      buttons: [{ text: 'Estou ciente!' }],
      subTitle: 'Não foi possível obter a lista de carros. Tente mais tarde.'
    }).present();
  }

  public seleciona(carro) {
    this.navCtrl.push(EscolhaPage, { carroSelecionado: carro });
  }

}
