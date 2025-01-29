import { inject, Injectable } from '@angular/core';

import { TrainingEvent } from '../api/models/trainingEvent';

import { ApiMockService } from '../api/api.mock.service';
import { firstValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrainingEventsRepositoryService {
  private readonly api = inject(ApiMockService);

  getTrainingEventsFromApi(): Promise<TrainingEvent[]> {
    return firstValueFrom(
      this.api.getTrainingEvents().pipe(
        map(e => e.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()))
      )
    );
  }
}
