import { Injectable } from '@angular/core';

import { IApi } from './api.interface';

import apiTrainingEvents from '../../../mock-api-responses/api-trainings';

import { TrainingEvent } from './models/trainingEvent';
import { of, delay, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiMockService implements IApi {
  delay = 600;
  private readonly trainingEvents = [...apiTrainingEvents];

  getTrainingEvents(): Observable<TrainingEvent[]> {
    return of(this.trainingEvents).pipe(delay(this.delay));
  }

  setTrainingEvent(trainingEvent: TrainingEvent): Observable<any> {
    return of('ok').pipe(delay(this.delay));
  }

  updateTrainingEvent(trainingEvent: TrainingEvent): Observable<any> {
    return of('ok').pipe(delay(this.delay));
  }

  deleteTrainingEvent(id: string): Observable<any> {
    return of('ok').pipe(delay(this.delay));
  }
}
