import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { TrainingList } from './training-list.page';

import { TrainingListRoutingModule } from './training-list-routing.module';
import { TrainingCardModalComponent } from '../training-card-modal/training-card-modal.component';
import { NewTrainingModalComponent } from '../new-training-modal/new-training-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileDetailsComponent } from '../profile-details/profile-details.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TrainingListRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    TrainingList,
    TrainingCardModalComponent,
    NewTrainingModalComponent,
    ProfileDetailsComponent,
  ],
})
export class TrainingListModule {}
