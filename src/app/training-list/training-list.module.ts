import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { TrainingList } from './training-list.page';

import { TrainingListRoutingModule } from './training-list-routing.module';

@NgModule({
  imports: [CommonModule, IonicModule, TrainingListRoutingModule],
  declarations: [TrainingList],
})
export class TrainingListModule {}
