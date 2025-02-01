import { Injectable } from '@angular/core';

import {
  createClient,
  SupabaseClient,
  AuthResponse,
} from '@supabase/supabase-js';

import { ISignUp } from './models/signUp';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly supabase: SupabaseClient = createClient(
    environment.supabaseConfig.supabaseUrl,
    environment.supabaseConfig.supabaseKey
  );

  async signUp(data: ISignUp): Promise<AuthResponse> {
    try {
      const res = await this.supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });
      if (!res.error) {
        await this.createProfile(data, res.data.user?.id as string);
      }
      return res;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  private async createProfile(data: ISignUp, id: string): Promise<void> {
    try {
      const { password, ...restData } = data;
      await this.supabase
        .from('fitness-scheduling-users')
        .insert({ ...restData, id, role: 'user' });
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
