import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ModalController, IonRouterOutlet } from '@ionic/angular';

import { TrainingEventsRepositoryService } from '../training-events-repository/training-events-repository.service';

import { TrainingEvent } from '../api/models/trainingEvent';
import { IUser } from '../api/models/user';

import { TrainingCardModalComponent } from '../training-card-modal/training-card-modal.component';

@Component({
  selector: 'app-training-list',
  templateUrl: 'training-list.page.html',
  styleUrls: ['training-list.page.scss'],
  standalone: false,
})
export class TrainingList {
  trainingEvents: TrainingEvent[] = [];
  loaded = false;
  user$ = false;

  private readonly trainingEventsRepository = inject(
    TrainingEventsRepositoryService
  );
  private readonly modalController = inject(ModalController);
  private readonly routerOutlet = inject(IonRouterOutlet);
  private readonly router = inject(Router);

  async ngOnInit(): Promise<void> {
    if (!this.user$) this.router.navigate(['/account']);
    this.trainingEvents =
      await this.trainingEventsRepository.getTrainingEventsFromStorage();
    this.loaded = true;
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
}
