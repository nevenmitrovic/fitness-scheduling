import { IUser } from './user';

export interface IUUID {
  user_id: string;
}

export interface TrainingEvent {
  id: string;
  date: string;
  time: string;
  exercisers: IUUID[];
}
