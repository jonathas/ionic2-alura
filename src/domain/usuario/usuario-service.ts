import { Config } from '../../app/app.config';
import { Usuario } from './usuario';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UsuarioService {

  private key = 'avatarUrl';
  private usuarioLogado: Usuario;

  constructor(private http: Http) { }

  public async efetuaLogin(email: string, senha: string) {
    let url = `${Config.apiBase}/login?email=${email}&senha=${senha}`;
    let dado = await this.http.get(url).map(res => res.json().usuario).toPromise();

    let usuario = new Usuario(dado.nome, dado.dataNascimento, dado.email, dado.telefone);
    this.usuarioLogado = usuario;
    return usuario;
  }

  public obtemUsuarioLogado() {
    return this.usuarioLogado;
  }

  public guardaAvatar(url) {
    localStorage.setItem(this.key, url);
  }

  public obtemAvatar() {
    return localStorage.getItem(this.key);
  }

}
