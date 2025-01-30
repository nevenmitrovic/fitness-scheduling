import { inject, Injectable } from '@angular/core';

import { TrainingEvent } from '../api/models/trainingEvent';

import { ApiMockService } from '../api/api.mock.service';
import { firstValueFrom, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrainingEventsRepositoryService {
  private readonly api = inject(ApiMockService);

  getTrainingEventsFromStorage(): TrainingEvent[] | Promise<TrainingEvent[]> {
    const trainingEvents = localStorage.getItem('trainingEvents');
    if (!trainingEvents) {
      return this.getTrainingEventsFromApi();
    }
    return JSON.parse(trainingEvents);
  }

  getTrainingEventsFromApi(): Promise<TrainingEvent[]> {
    this.clearTrainingEventsStorage();
    return firstValueFrom(
      this.api.getTrainingEvents().pipe(
        tap((e) => localStorage.setItem('trainingEvents', JSON.stringify(e))),
        map((e) =>
          e.sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          )
        )
      )
    );
  }

  clearTrainingEventsStorage(): void {
    localStorage.removeItem('trainingEvents');
  }
}
