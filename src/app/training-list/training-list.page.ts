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
    await this.userService.loadUser();
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
      await this.refreshTrainingEvents();
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

  async refreshTrainingEvents(): Promise<void> {
    try {
      this.loaded = false;
      this.trainingEvents =
        await this.trainingEventsRepository.getTrainingEventsFromApi();
    } catch (e) {
      console.error(e);
    } finally {
      this.loaded = true;
    }
  }

  async openTrainingCardModal(exercisers: IUser[]): Promise<void> {
    const modal = await this.modalController.create({
      component: TrainingCardModalComponent,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {
        exercisers,
      },
    });
    await modal.present();
    await modal.onDidDismiss();
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
    await this.refreshTrainingEvents();
  }

  getFilteredProfiles(ex: IUUID[]): IUser[] {
    let arr: IUser[] = [];
    ex.forEach((u) => {
      arr = this.profiles.filter((p) => p.id === u.user_id);
    });
    return arr;
  }
}
