import { Injectable } from '@angular/core';

import {
  createClient,
  SupabaseClient,
  AuthResponse,
} from '@supabase/supabase-js';

import { ISignUp } from './models/signUp';

import { from, Observable } from 'rxjs';

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
    this.userProfile(data);
    try {
      return await this.supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  private async userProfile(data: ISignUp): Promise<void> {
    try {
      await this.supabase.from('fitness-scheduling-users').insert({...data, role: 'user'});
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
