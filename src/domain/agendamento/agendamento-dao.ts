import { Agendamento } from './agendamento';
import { Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';
import { Carro } from './../carro/carro';

@Injectable()
export class AgendamentoDao {

  constructor(private storage: Storage) { }

  private getKey(agendamento: Agendamento) {
    return agendamento.email + agendamento.data.substr(0, 10);
  }

  public salva(agendamento: Agendamento) {
    return this.storage.set(this.getKey(agendamento), agendamento);
  }

  public isAgendamentoDuplicado(agendamento: Agendamento) {
    return this.storage.get(this.getKey(agendamento)).then(dado => dado ? true : false);
  }

  public listaTodos() {
    let agendamentos = [];
    return this.storage.forEach(dado => {
      let carro = new Carro(dado.carro.nome, dado.carro.preco);
      let agendamento = new Agendamento(
        carro,
        dado.valor,
        dado.nome,
        dado.endereco,
        dado.email,
        dado.data,
        dado.confirmado);

      agendamentos.push(agendamento);
    }).then(() => agendamentos);
  }

}
