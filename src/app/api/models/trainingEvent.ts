import { IUser } from './user';

export interface TrainingEvent {
  id: string;
  date: string;
  exercisers: IUser[];
}
