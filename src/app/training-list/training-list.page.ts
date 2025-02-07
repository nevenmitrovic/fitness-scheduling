import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  ModalController,
  IonRouterOutlet,
  LoadingController,
  AlertController,
} from '@ionic/angular';

import { ProfilesRepositoryService } from '../profiles-repository/profiles-repository.service';
import { TrainingEventsRepositoryService } from '../training-events-repository/training-events-repository.service';
import { UserService } from '../api/user.service';
import { TrainingService } from '../api/training.service';

import { IUUID, TrainingEvent } from '../api/models/trainingEvent';
import { IUser } from '../api/models/user';

import { TrainingCardModalComponent } from '../training-card-modal/training-card-modal.component';
import { NewTrainingModalComponent } from '../new-training-modal/new-training-modal.component';

@Component({
  selector: 'app-training-list',
  templateUrl: 'training-list.page.html',
  styleUrls: ['training-list.page.scss'],
  standalone: false,
})
export class TrainingList {
  profiles: IUser[] = [];
  trainingEvents: TrainingEvent[] = [];
  loaded = false;
  user$: IUser | null = null;

  private readonly trainingEventsRepository = inject(
    TrainingEventsRepositoryService
  );
  private readonly modalController = inject(ModalController);
  private readonly routerOutlet = inject(IonRouterOutlet);
  private readonly router = inject(Router);
  private readonly userService = inject(UserService);
  private readonly trainingService = inject(TrainingService);
  private readonly loadingController = inject(LoadingController);
  private readonly alertController = inject(AlertController);
  private readonly profilesRepository = inject(ProfilesRepositoryService);

  async ngOnInit(): Promise<void> {
    this.userService.getUserProfile().subscribe((user) => {
      this.user$ = user;
      if (!this.user$) this.router.navigate(['/account/login']);
    });
    this.trainingEvents =
      await this.trainingEventsRepository.getTrainingEventsFromStorage();
    this.profiles = await this.profilesRepository.getProfilesFromStorage();
    this.loaded = true;
  }

  async addUserToTraining(tID: string, e: Event): Promise<void> {
    e.stopPropagation();

    const ex = await this.trainingService.getExercisersFromTraining(tID);
    if (ex.length === 8) throw new Error('No more places available');

    const loading = await this.loadingController.create({
      message: 'Prijavljivanje na trening u toku...',
    });
    await loading.present();
    try {
      if (!this.user$) return;
      await this.trainingService.applyForTraining(this.user$.id, tID);
      const done = await this.alertController.create({
        header: 'Prijava uspešna',
        message: 'Uspesno ste se prijavili na trening.',
        buttons: ['OK'],
      });
      await done.present();
      await this.refreshTrainingEventsAndProfiles();
    } catch (e) {
      console.error(e);
      const alert = await this.alertController.create({
        header: 'Greška',
        message: 'Došlo je do greške prilikom prijavljivanja na trening.',
        buttons: ['OK'],
      });
      await alert.present();
    } finally {
      await loading.dismiss();
    }
  }

  async refreshTrainingEventsAndProfiles(): Promise<void> {
    try {
      this.loaded = false;
      this.trainingEvents =
        await this.trainingEventsRepository.getTrainingEventsFromApi();
      this.profiles = await this.profilesRepository.getProfilesFromApi();
    } catch (e) {
      console.error(e);
    } finally {
      this.loaded = true;
    }
  }

  async openTrainingCardModal(exercisers: IUser[], tID: string): Promise<void> {
    const modal = await this.modalController.create({
      component: TrainingCardModalComponent,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {
        exercisers,
        user: this.user$,
      },
    });
    await modal.present();
    const dismiss = await modal.onDidDismiss();
    if (dismiss.data) {
      const res = await this.trainingService.removeUserFromTraining(
        dismiss.data,
        tID
      );
      if (res.status === 204) {
        await this.refreshTrainingEventsAndProfiles();
        if (this.user$?.role === 'admin') {
          const alert = await this.alertController.create({
            header: 'Uspesno',
            message: 'Uspesno ste odjavili korisnika sa treninga.',
            buttons: ['OK'],
          });
          await alert.present();
          return;
        }
        const alert = await this.alertController.create({
          header: 'Uspesno',
          message: 'Uspesno ste se odjavili sa treninga.',
          buttons: ['OK'],
        });
        await alert.present();
        return;
      }
      const alert = await this.alertController.create({
        header: 'Greška',
        message: 'Došlo je do greške prilikom odjavljivanja sa treninga.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

  isAdmin(): boolean {
    return this.user$?.role === 'admin';
  }

  async openNewTrainingModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: NewTrainingModalComponent,
      presentingElement: this.routerOutlet.nativeEl,
    });
    await modal.present();
    await modal.onDidDismiss();
    await this.refreshTrainingEventsAndProfiles();
  }

  getFilteredProfiles(ex: IUUID[]): IUser[] {
    let arr: IUser[] = [];
    ex.forEach((u) => {
      this.profiles.filter((p) => {
        if (p.id === u.user_id) arr.push(p);
      });
    });
    return arr;
  }

  isUserApplied(ex: IUUID[]): boolean {
    if (!this.user$) return false;
    return ex.some((u) => u.user_id === this.user$?.id);
  }

  async cancelApplication(tID: string, e: Event): Promise<void> {
    e.stopPropagation();
    const alert = await this.alertController.create({
      header: 'Odjava sa treninga',
      message: 'Da li ste sigurni da želite da se odjavite sa treninga?',
      buttons: [
        {
          text: 'Odustani',
          role: 'cancel',
        },
        {
          text: 'Odjavi se',
          handler: async () => {
            const loading = await this.loadingController.create({
              message: 'Odjavljivanje sa treninga u toku...',
            });
            await loading.present();
            try {
              if (!this.user$) return;
              await this.trainingService.removeUserFromTraining(
                this.user$.id,
                tID
              );
              const done = await this.alertController.create({
                header: 'Odjava uspešna',
                message: 'Uspešno ste se odjavili sa treninga.',
                buttons: ['OK'],
              });
              await done.present();
              await this.refreshTrainingEventsAndProfiles();
            } catch (e) {
              console.error(e);
              const alert = await this.alertController.create({
                header: 'Greška',
                message:
                  'Došlo je do greške prilikom odjavljivanja sa treninga.',
                buttons: ['OK'],
              });
              await alert.present();
            } finally {
              await loading.dismiss();
            }
          },
        },
      ],
    });
    await alert.present();
  }
}
