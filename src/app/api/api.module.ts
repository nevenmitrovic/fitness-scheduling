import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiMockService } from './api.mock.service';
import { TrainingService } from './training.service';
import { UserService } from './user.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [TrainingService, UserService],
})
export class ApiModule {}
