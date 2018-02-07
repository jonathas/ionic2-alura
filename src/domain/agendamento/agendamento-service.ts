import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Agendamento } from './agendamento';
import { AgendamentoDao } from './agendamento-dao';

@Injectable()
export class AgendamentoService {
  constructor(private http: Http, private dao: AgendamentoDao) { }

  agenda(agendamento: Agendamento) {
    let url = `https://aluracar.herokuapp.com/salvarpedido?carro=${agendamento.carro.nome}&nome=${agendamento.nome}&preco=${agendamento.valor}&endereco=${agendamento.endereco}&email=${agendamento.email}&dataAgendamento=${agendamento.data}`;
    return this.http.
      get(url)
      .toPromise()
      .then(() => agendamento.confirmado = true, err => console.error(err))
      .then(() => this.dao.salva(agendamento))
      .then(() => agendamento.confirmado);
  }
}
