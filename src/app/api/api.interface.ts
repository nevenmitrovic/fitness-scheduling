import { Observable } from 'rxjs';
import { TrainingEvent } from 'src/app/api/models/trainingEvent';

export interface IApi {
  getTrainingEvents(): Observable<TrainingEvent[]>;
  setTrainingEvent(trainingEvent: TrainingEvent): Observable<void>;
  updateTrainingEvent(trainingEvent: TrainingEvent): Observable<void>;
  deleteTrainingEvent(id: string): Observable<void>;
}
