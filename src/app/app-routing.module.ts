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
    path: 'training-details/:id',
    loadChildren: () =>
      import('./training-details/training-details.module').then(
        (m) => m.TrainingDetailsPageModule
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
  {
    path: 'training-details',
    loadChildren: () => import('./training-details/training-details.module').then( m => m.TrainingDetailsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
