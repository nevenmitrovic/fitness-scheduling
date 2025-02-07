import { Component, Input, OnInit, inject } from '@angular/core';

import { IUser } from '../api/models/user';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
  standalone: false,
})
export class ProfileDetailsComponent implements OnInit {
  @Input({ required: true }) user!: IUser;

  private readonly modalController = inject(ModalController);

  ngOnInit() {
    if (!this.user) {
      console.error('Profile not found');
      this.modalController.dismiss();
    }
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
