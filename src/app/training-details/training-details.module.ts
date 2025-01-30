import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrainingDetailsPageRoutingModule } from './training-details-routing.module';

import { TrainingDetailsPage } from './training-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrainingDetailsPageRoutingModule
  ],
  declarations: [TrainingDetailsPage]
})
export class TrainingDetailsPageModule {}
