import { Injectable } from '@angular/core';

import { IApi } from './api.interface';

import apiTrainingEvents from '../../../mock-api-responses/api-trainings';

import { TrainingEvent } from './models/trainingEvent';
import { of, delay, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiMockService implements IApi {
  delay = 600;
  private readonly trainingEvents = [...apiTrainingEvents];

  getTrainingEvents(): Observable<TrainingEvent[]> {
    return of(this.trainingEvents).pipe(delay(this.delay));
  }

  getTrainingEvent(id: string): Observable<any> {
    const res = this.trainingEvents.find((event) => event.id === id);
    if (!res) {
      return of(throwError(() => new Error('Training event not found'))).pipe(
        delay(this.delay)
      );
    }
    return of(res).pipe(delay(this.delay));
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
