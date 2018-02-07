import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UsuarioService } from './../../domain/usuario/usuario-service';

@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})
export class PerfilPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private service: UsuarioService) { }

  get usuarioLogado() {
    return this.service.obtemUsuarioLogado();
  }

}
