import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AgendamentoDao } from './../../domain/agendamento/agendamento-dao';
import { Agendamento } from '../../domain/agendamento/agendamento';

@Component({
  selector: 'page-agendamentos',
  templateUrl: 'agendamentos.html'
})
export class AgendamentosPage {

  public agendamentos: Array<Agendamento>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dao: AgendamentoDao) {

    this.dao.listaTodos()
    .then(agendamentos => this.agendamentos = agendamentos);
  }

}
