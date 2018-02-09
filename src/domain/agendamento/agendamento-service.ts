import { Config } from '../../app/app.config';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Agendamento } from './agendamento';
import { AgendamentoDao } from './agendamento-dao';

@Injectable()
export class AgendamentoService {
  constructor(private http: Http, private dao: AgendamentoDao) { }

  private montaUri(agendamento: Agendamento) {
    return `${Config.apiBase}/salvarpedido?carro=${agendamento.carro.nome}&nome=${agendamento.nome}&preco=${agendamento.valor}&endereco=${agendamento.endereco}&email=${agendamento.email}&dataAgendamento=${agendamento.data}`;
  }

  private async efetuaAgendamento(agendamento: Agendamento) {
    try {
      await this.http.get(this.montaUri(agendamento)).toPromise();
      agendamento.confirmado = true;
    } catch (err) {
      console.error(err);
      agendamento.confirmado = false;
    } finally {
      this.dao.salva(agendamento);
      return agendamento.confirmado;
    }
  }

  public async agenda(agendamento: Agendamento) {
    let existe = await this.dao.isAgendamentoDuplicado(agendamento);
    if (existe) throw new Error('Esse agendamento já foi realizado');
    return this.efetuaAgendamento(agendamento);
  }

  public reagenda(agendamento: Agendamento) {
    return this.efetuaAgendamento(agendamento);
  }

}
