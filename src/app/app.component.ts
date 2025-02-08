import { Component, inject, OnInit } from '@angular/core';

import { UserService } from './api/user.service';

import { Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

import { App } from '@capacitor/app';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  private readonly userService = inject(UserService);
  private readonly platformService = inject(Platform);
  private readonly alertController = inject(AlertController);

  async ngOnInit(): Promise<void> {
    this.initializeApp();
    this.userService.onAuthStateChange();
  }

  private async initializeApp(): Promise<void> {
    try {
      await this.platformService.ready();
      await SplashScreen.hide();
      await StatusBar.setStyle({ style: Style.Light });
    } catch (e) {
      localStorage.clear();
      const alert = await this.alertController.create({
        header: 'Greska',
        message: 'Greska prilikom pokretanja aplikacije, pokusajte ponovo.',
        buttons: ['OK'],
      });
      await alert.present();
      await this.userService.signOut();
      await App.exitApp();
    }
  }
}
