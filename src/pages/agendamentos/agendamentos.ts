import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AgendamentoDao } from './../../domain/agendamento/agendamento-dao';
import { Agendamento } from '../../domain/agendamento/agendamento';
import { AgendamentoService } from './../../domain/agendamento/agendamento-service';

@Component({
  selector: 'page-agendamentos',
  templateUrl: 'agendamentos.html'
})
export class AgendamentosPage {

  public agendamentos: Array<Agendamento>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dao: AgendamentoDao,
    private service: AgendamentoService,
    private alertCtrl: AlertController) {

    this.dao.listaTodos()
      .then(agendamentos => this.agendamentos = agendamentos);
  }

  public async reenvia(agendamento: Agendamento) {
    let confirmado = await this.service.reagenda(agendamento);
    confirmado
      ? this.createAlert('Agendamento reenviado com sucesso')
      : this.createAlert('Não foi possível reenviar o agendamento. Tente outra vez');
  }

  private createAlert(subTitle: string) {
    this.alertCtrl.create({
      title: 'Envio',
      subTitle: subTitle,
      buttons: [{ text: 'Ok' }]
    }).present();
  }

}
