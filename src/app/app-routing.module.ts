import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'training-list',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./training-list/training-list.module').then(
        (m) => m.TrainingListModule
      ),
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./account/account.module').then((m) => m.AccountModule),
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
