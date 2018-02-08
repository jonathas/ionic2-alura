import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Agendamento } from './agendamento';
import { AgendamentoDao } from './agendamento-dao';

@Injectable()
export class AgendamentoService {
  constructor(private http: Http, private dao: AgendamentoDao) { }

  private montaUri(agendamento: Agendamento) {
    return `https://aluracar.herokuapp.com/salvarpedido?carro=${agendamento.carro.nome}&nome=${agendamento.nome}&preco=${agendamento.valor}&endereco=${agendamento.endereco}&email=${agendamento.email}&dataAgendamento=${agendamento.data}`;
  }

  public agenda(agendamento: Agendamento) {
    return this.dao.isAgendamentoDuplicado(agendamento).then(existe => {
      if (existe) throw new Error('Esse agendamento já foi realizado');
      return this.http.
        get(this.montaUri(agendamento))
        .toPromise()
        .then(() => agendamento.confirmado = true, err => console.error(err))
        .then(() => this.dao.salva(agendamento))
        .then(() => agendamento.confirmado);
    });
  }

  public reagenda(agendamento: Agendamento) {
    return this.http.
      get(this.montaUri(agendamento))
      .toPromise()
      .then(() => agendamento.confirmado = true, err => console.error(err))
      .then(() => this.dao.salva(agendamento))
      .then(() => agendamento.confirmado);
  }

}
