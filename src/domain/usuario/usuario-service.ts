import { Usuario } from './usuario';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

const KEY = 'avatarUrl';

@Injectable()
export class UsuarioService {

  private usuarioLogado: Usuario;

  constructor(private http: Http) { }

  public efetuaLogin(email: string, senha: string) {
    let url = `https://aluracar.herokuapp.com/login?email=${email}&senha=${senha}`;
    return this.http
      .get(url)
      .map(res => res.json().usuario)
      .toPromise()
      .then(dado => {
        let usuario = new Usuario(dado.nome, dado.dataNascimento, dado.email, dado.telefone);
        this.usuarioLogado = usuario;
        return usuario;
      });
  }

  obtemUsuarioLogado() {
    return this.usuarioLogado;
  }

  guardaAvatar(url) {
    localStorage.setItem(KEY, url);
  }

  obtemAvatar() {
    return localStorage.getItem(KEY);
  }

}
