import { IUser } from './user';

export interface TrainingEvent {
  id: string;
  date: string;
  time: string;
  exercisers: IUser[];
}
