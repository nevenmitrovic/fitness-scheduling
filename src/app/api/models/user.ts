export enum Role {
  user = 'user',
  admin = 'admin',
}

export interface IUser {
  id: string;
  fullName: string;
  dateOfBirth: string;
  phone: string;
  role: Role;
}
