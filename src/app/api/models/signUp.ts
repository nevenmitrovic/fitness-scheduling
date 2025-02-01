import { Role } from './user';

export interface ISignUp {
  email: string;
  password: string;
  fullName: string;
  dateOfBirth: string;
  phone: string;
  role: Role;
}
