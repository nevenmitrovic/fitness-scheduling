import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { TrainingList } from './training-list.page';

import { TrainingListRoutingModule } from './training-list-routing.module';
import { TrainingCardModalComponent } from '../training-card-modal/training-card-modal.component';

@NgModule({
  imports: [CommonModule, IonicModule, TrainingListRoutingModule],
  declarations: [TrainingList, TrainingCardModalComponent],
})
export class TrainingListModule {}
