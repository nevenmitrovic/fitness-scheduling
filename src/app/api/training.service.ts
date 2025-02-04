import { Injectable } from '@angular/core';

import { SupabaseClient, createClient } from '@supabase/supabase-js';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  private readonly supabase: SupabaseClient = createClient(
    environment.supabaseConfig.supabaseUrl,
    environment.supabaseConfig.supabaseKey
  );

  async createTrainingEvent(d: string): Promise<any> {
    const date = d.split('T')[0];
    const time = d.split('T')[1];
    try {
      const res = await this.supabase
        .from('training_events')
        .insert({ date, time });
      if (res.error) throw res.error;
      return res;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
