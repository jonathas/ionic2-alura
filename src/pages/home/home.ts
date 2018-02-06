import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  public carros;

  constructor(
    public navCtrl: NavController,
    private http: Http,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {

  }

  ngOnInit(): void {
    let loader = this.loadingCtrl.create({
      content: 'Buscando novos carros. Aguarde ...'
    });

    loader.present();

    this.http.get('https://aluracar.herokuapp.com/')
      .map(res => res.json())
      .toPromise()
      .then(carros => {
        this.carros = carros;
        loader.dismiss();
      }).catch(err => {
        console.error(err);
        loader.dismiss();
        this.alertCtrl.create({
          title: 'Falha na conexão',
          buttons: [{ text: 'Estou ciente!' }],
          subTitle: 'Não foi possível obter a lista de carros. Tente mais tarde.'
        }).present();
      });
  }

}
