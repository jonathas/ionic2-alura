import { Agendamento } from './agendamento';
import { Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';

@Injectable()
export class AgendamentoDao {

  constructor(private storage: Storage) { }

  private getKey(agendamento: Agendamento) {
    return agendamento.email + agendamento.data.substr(0, 10);
  }

  salva(agendamento: Agendamento) {
    return this.storage.set(this.getKey(agendamento), agendamento);
  }

  isAgendamentoDuplicado(agendamento: Agendamento) {
    return this.storage.get(this.getKey(agendamento)).then(dado => dado ? true : false);
  }

}
