import { Injectable, inject } from '@angular/core';

import { AlertController } from '@ionic/angular';

import { UserService } from '../api/user.service';

import { IUser } from '../api/models/user';

@Injectable({
  providedIn: 'root',
})
export class ProfilesRepositoryService {
  private readonly alertController = inject(AlertController);
  private readonly userService = inject(UserService);

  getProfilesFromStorage(): IUser[] | Promise<IUser[]> {
    const p = localStorage.getItem('profiles');
    if (!p) {
      return this.getProfilesFromApi();
    }
    return JSON.parse(p);
  }

  async getProfilesFromApi(): Promise<IUser[]> {
    this.clearProfilesFromStorage();
    try {
      const p = await this.userService.getAllProfiles();
      localStorage.setItem('profiles', JSON.stringify(p));
      return p;
    } catch (e) {
      console.error(e);
      const alert = await this.alertController.create({
        header: 'Problem pri ucitavanju profila',
        message: 'Problem sa ucitavanjem profila, pokusajte ponovo.',
        buttons: ['OK'],
      });
      await alert.present();
      return [];
    }
  }

  private clearProfilesFromStorage(): void {
    localStorage.removeItem('profiles');
  }
}
