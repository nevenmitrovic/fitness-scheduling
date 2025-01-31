import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'training-list',
    loadChildren: () =>
      import('./training-list/training-list.module').then(
        (m) => m.TrainingListModule
      ),
  },
  {
    path: '**',
    redirectTo: 'training-list',
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: 'training-list',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
