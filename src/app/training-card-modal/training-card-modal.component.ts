import { Component, Input, OnInit, inject } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { IUser } from '../api/models/user';

import { ProfileDetailsComponent } from '../profile-details/profile-details.component';

@Component({
  selector: 'app-training-card-modal',
  templateUrl: './training-card-modal.component.html',
  styleUrls: ['./training-card-modal.component.scss'],
  standalone: false,
})
export class TrainingCardModalComponent implements OnInit {
  @Input({ required: true }) exercisers!: IUser[];
  @Input({ required: true }) user!: IUser;

  private readonly modalController = inject(ModalController);

  ngOnInit() {
    if (!this.exercisers || !this.user) {
      this.closeModal();
    }
  }

  async openProfileDetails(user: IUser): Promise<void> {
    if (this.user.role !== 'admin') return;

    const modal = await this.modalController.create({
      component: ProfileDetailsComponent,
      componentProps: {
        user,
      },
    });
    await modal.present();
    await modal.onDidDismiss();
  }

  removeUserFromTraining(id: string, e: Event): void {
    e.stopPropagation();
    this.modalController.dismiss(id);
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
