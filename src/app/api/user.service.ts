import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

import {
  createClient,
  SupabaseClient,
  AuthResponse,
  User,
} from '@supabase/supabase-js';

import { BehaviorSubject, Observable } from 'rxjs';

import { ISignIn } from './models/signIn';
import { ISignUp } from './models/signUp';

import { environment } from 'src/environments/environment';

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
  private readonly router = inject(Router);

  constructor() {
    this.supabase.auth.onAuthStateChange((event, sess) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        console.log('SET USER');
        this.currentUser.next(sess?.user as User);
      } else {
        this.currentUser.next(false);
      }
    });
    this.loadUser();
  }

  async loadUser() {
    if (this.currentUser.value) return;

    const user = await this.supabase.auth.getUser();
    if (user.data.user) {
      this.currentUser.next(user.data.user);
    } else {
      this.currentUser.next(false);
    }
  }

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

  async signIn(credentials: ISignIn): Promise<AuthResponse> {
    try {
      return this.supabase.auth.signInWithPassword(credentials);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async signOut(): Promise<void> {
    await this.supabase.auth.signOut();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  getCurrentUser(): Observable<User | boolean> {
    return this.currentUser.asObservable();
  }

  getCurrentUserId(): string | null {
    if (!this.currentUser.value) return null;
    return (this.currentUser.value as User).id;
  }
}
