import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UsuarioService } from './../../domain/usuario/usuario-service';
import { Camera } from '@ionic-native/camera';

@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})
export class PerfilPage implements OnInit {

  public url: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private service: UsuarioService,
    public camera: Camera) { }

  get usuarioLogado() {
    return this.service.obtemUsuarioLogado();
  }

  public ngOnInit() {
    this.url = this.service.obtemAvatar();
  }

  public async tiraFoto() {
    try {
      let url = await this.camera.getPicture({
        destinationType: this.camera.DestinationType.FILE_URI,
        saveToPhotoAlbum: true,
        correctOrientation: true
      });

      this.service.guardaAvatar(url);
      this.url = url;
    } catch (err) {
      console.error(err)
    }
  }

}
