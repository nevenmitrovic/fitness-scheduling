import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrainingDetailsPage } from './training-details.page';

const routes: Routes = [
  {
    path: '',
    component: TrainingDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingDetailsPageRoutingModule {}
