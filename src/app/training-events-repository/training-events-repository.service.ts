import { inject, Injectable } from '@angular/core';

import { AlertController } from '@ionic/angular';

import { TrainingEvent } from '../api/models/trainingEvent';

import { TrainingService } from '../api/training.service';

@Injectable({
  providedIn: 'root',
})
export class TrainingEventsRepositoryService {
  private readonly alertController = inject(AlertController);
  private readonly trainingService = inject(TrainingService);

  getTrainingEventsFromStorage(): TrainingEvent[] | Promise<TrainingEvent[]> {
    const e = localStorage.getItem('trainingEvents');
    if (!e) {
      return this.getTrainingEventsFromApi();
    }
    return JSON.parse(e);
  }

  async getTrainingEventsFromApi(): Promise<TrainingEvent[]> {
    this.clearTrainingEventsStorage();
    const e = await this.trainingService.getTrainingEvents();
    if (e.error) {
      console.error(e.error);
      const alert = await this.alertController.create({
        header: 'Problem pri ucitavanju treninga',
        message: 'Problem sa ucitavanjem treninga, pokusajte ponovo.',
        buttons: ['OK'],
      });
      await alert.present();
      return [];
    }
    e.data.sort(
      (a: TrainingEvent, b: TrainingEvent) =>
        new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime()
    );
    localStorage.setItem('trainingEvents', JSON.stringify(e.data));
    return e.data;
  }

  private clearTrainingEventsStorage(): void {
    localStorage.removeItem('trainingEvents');
  }
}
