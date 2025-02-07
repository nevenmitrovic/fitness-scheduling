import { Component, Input, OnInit, inject } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { IUser } from '../api/models/user';

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

  removeUserFromTraining(id: string): void {
    this.modalController.dismiss(id);
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
