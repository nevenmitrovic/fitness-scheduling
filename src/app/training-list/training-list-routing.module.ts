import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingList } from './training-list.page';

const routes: Routes = [
  {
    path: '',
    component: TrainingList,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingListRoutingModule {}
