import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {
  AlertController,
  ModalController,
  LoadingController,
} from '@ionic/angular';

import { TrainingService } from '../api/training.service';

@Component({
  selector: 'app-new-training-modal',
  templateUrl: './new-training-modal.component.html',
  styleUrls: ['./new-training-modal.component.scss'],
  standalone: false,
})
export class NewTrainingModalComponent {
  trainingForm!: FormGroup;
  minDate!: string;

  private readonly modalController = inject(ModalController);
  private readonly alertController = inject(AlertController);
  private readonly loadingController = inject(LoadingController);
  private readonly trainingService = inject(TrainingService);

  constructor() {
    this.trainingForm = new FormBuilder().group({
      date: ['', [Validators.required]],
    });
    this.minDate = new Date().toISOString();
  }

  async setTrainingEvent(): Promise<void> {
    console.log(this.trainingForm.value.date);
    const loading = await this.loadingController.create({
      spinner: 'circles',
      message: 'Kreiranje treninga...',
    });
    await loading.present();
    try {
      const res = await this.trainingService.createTrainingEvent(
        this.trainingForm.value.date
      );
      if (res.status === 201) {
        const alert = await this.alertController.create({
          header: 'Kreiranje uspesno!',
          message: 'Kreiranje je uspesno, hvala vam!',
          buttons: ['OK'],
        });
        await alert.present();
      }
      if (res.status > 399) throw new Error('Creating training event failed');
    } catch (e) {
      console.error(e);
      const alert = await this.alertController.create({
        header: 'Kreiranje neuspesno!',
        message: 'Kreiranje nije uspelo, molim vas pokusajte ponovo.',
        buttons: ['OK'],
      });
      await alert.present();
    } finally {
      this.trainingForm.reset();
      await loading.dismiss();
    }
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
