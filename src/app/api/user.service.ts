import { Injectable, inject } from '@angular/core';

import {
  createClient,
  SupabaseClient,
  AuthResponse,
  User,
} from '@supabase/supabase-js';

import { BehaviorSubject, Observable, from, map } from 'rxjs';

import { ISignIn } from './models/signIn';
import { ISignUp } from './models/signUp';

import { environment } from 'src/environments/environment';
import { IUser } from './models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUser: BehaviorSubject<User | boolean> = new BehaviorSubject<
    User | boolean
  >(false);

  private readonly supabase: SupabaseClient = createClient(
    environment.supabaseConfig.supabaseUrl,
    environment.supabaseConfig.supabaseKey
  );

  onAuthStateChange(): void {
    this.supabase.auth.onAuthStateChange((event, sess) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        this.currentUser.next(sess?.user as User);
      }
      if (event === 'SIGNED_OUT') {
        this.currentUser.next(false);
      }
    });
  }

  async signUp(data: ISignUp): Promise<AuthResponse> {
    try {
      const res = await this.supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });
      if (!res.error) {
        await this.createProfile(data, res.data.user?.id as string);
        this.currentUser.next(res.data.user as User);
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
        .from('users_profiles')
        .insert({ ...restData, id, role: 'user' });
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async signIn(credentials: ISignIn): Promise<AuthResponse> {
    try {
      const res = await this.supabase.auth.signInWithPassword(credentials);
      if (res.error) throw res.error;
      this.currentUser.next(res.data.user as User);
      return res;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async signOut(): Promise<void> {
    await this.supabase.auth.signOut();
    this.currentUser.next(false);
    localStorage.clear();
  }

  getCurrentUser(): Observable<User | boolean> {
    return this.currentUser.asObservable();
  }

  getCurrentUserId(): string | null {
    if (!this.currentUser.value) return null;
    return (this.currentUser.value as User).id;
  }

  getUserProfile(): Observable<IUser | null> {
    return from(
      this.supabase
        .from('users_profiles')
        .select('*')
        .eq('id', this.getCurrentUserId())
        .single()
    ).pipe(
      map((response) => {
        if (response.error) {
          console.error(response.error);
          return null;
        }
        return response.data as IUser;
      })
    );
  }

  async getAllProfiles(): Promise<IUser[]> {
    try {
      const res = await this.supabase.from('users_profiles').select('*');
      if (res.error) throw res.error;
      return res.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
