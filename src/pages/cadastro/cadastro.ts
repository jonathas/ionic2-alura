import { AgendamentoService } from './../../domain/agendamento/agendamento-service';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { Carro } from '../../domain/carro/carro';
import { HomePage } from '../home/home';
import { Agendamento } from '../../domain/agendamento/agendamento';
import { Vibration } from '@ionic-native/vibration';
import { DatePicker } from '@ionic-native/date-picker';

@Component({
  templateUrl: 'cadastro.html'
})
export class CadastroPage {

  public carro: Carro;
  public precoTotal: number;

  public agendamento: Agendamento;
  private alerta: Alert;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private service: AgendamentoService,
    private alertCtrl: AlertController,
    public vibration: Vibration,
    public datePicker: DatePicker) {

    this.carro = navParams.get('carro');
    this.precoTotal = navParams.get('precoTotal');

    this.agendamento = new Agendamento(this.carro, this.precoTotal);

    this.alerta = this.alertCtrl.create({
      title: 'Aviso',
      buttons: [{ text: 'Ok', handler: () => { this.navCtrl.setRoot(HomePage) } }]
    });
  }

  // only fires when the app is loaded, not when the page is shown
  /*ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }*/

  public async agenda() {
    try {
      if (!this.isValid()) {
        return;
      }

      let confirmado = await this.service.agenda(this.agendamento)

      confirmado ?
        this.alerta.setSubTitle('Agendamento realizado com sucesso!') :
        this.alerta.setSubTitle('Não foi possível realizar o agendamento. Tente mais tarde');

      this.alerta.present();
    } catch (err) {
      console.error(err);
      this.alerta.setSubTitle(err.message);
      this.alerta.present();
    }
  }

  private isValid() {
    if (!this.agendamento.nome || !this.agendamento.endereco || !this.agendamento.email) {

      this.vibration.vibrate(500);

      this.alertCtrl.create({
        title: 'Preenchimento obrigatório',
        subTitle: 'Você deve preencher todas as informações',
        buttons: [{ text: 'Ok' }]
      }).present();

      return false;
    }

    return true;
  }

  public async selecionaData() {
    let data = await this.datePicker.show({
      date: new Date(),
      mode: 'date'
    });
    this.agendamento.data = data.toISOString();
  }

}
