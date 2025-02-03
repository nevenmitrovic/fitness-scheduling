import { inject, Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';

import { environment } from 'src/environments/environment';

import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private readonly router = inject(Router);
  private readonly supabase: SupabaseClient = createClient(
    environment.supabaseConfig.supabaseUrl,
    environment.supabaseConfig.supabaseKey
  );

  async canActivate(): Promise<boolean | UrlTree> {
    const user = await this.supabase.auth.getUser();
    if (user.error) {
      console.error('Error fetching user: ', user.error);
      return this.router.parseUrl('/account/sign-in');
    }
    return true;
  }
}
