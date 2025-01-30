import { Component, inject, OnInit } from '@angular/core';

import { TrainingEventsRepositoryService } from '../training-events-repository/training-events-repository.service';

import { TrainingEvent } from '../api/models/trainingEvent';

@Component({
  selector: 'app-training-list',
  templateUrl: 'training-list.page.html',
  styleUrls: ['training-list.page.scss'],
  standalone: false,
})
export class TrainingList {
  trainingEvents: TrainingEvent[] = [];
  loaded = false;

  private readonly trainingEventsRepository = inject(
    TrainingEventsRepositoryService
  );

  async ngOnInit(): Promise<void> {
    this.trainingEvents =
      await this.trainingEventsRepository.getTrainingEventsFromStorage();
    this.loaded = true;
  }

  async refreshTrainingEvents(): Promise<void> {
    try {
      this.loaded = false;
      this.trainingEvents =
        await this.trainingEventsRepository.getTrainingEventsFromApi();
    } catch (e) {
      console.error(e);
    } finally {
      this.loaded = true;
    }
  }
}
