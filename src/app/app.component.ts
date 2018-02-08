import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from './../pages/login/login';
import { PerfilPage } from './../pages/perfil/perfil';
import { AgendamentosPage } from './../pages/agendamentos/agendamentos';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = LoginPage;

  public paginas = [
    { titulo: 'Perfil', componente: PerfilPage },
    { titulo: 'Agendamentos', componente: AgendamentosPage }
  ];

  @ViewChild(Nav) public nav: Nav;

  constructor(
    platform: Platform,
    public splashscreen: SplashScreen,
    public statusBar: StatusBar) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashscreen.hide();
    });
  }

  public abrePagina(pagina) {
    this.nav.push(pagina.componente);
  }

}
