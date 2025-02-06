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

  async applyForTraining(uID: string, tID: string): Promise<any> {
    try {
      const res = await this.supabase
        .from('training_event_exercisers')
        .insert({ training_event_id: tID, user_id: uID });
      if (res.error) throw res.error;
      return res;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async getExercisersFromTraining(tID: string): Promise<any> {
    try {
      const res = await this.supabase
        .from('training_event_exercisers')
        .select('user_id')
        .eq('training_event_id', tID)
      if (res.error) throw res.error;
      return res;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async getTrainingEvents(): Promise<any> {
    try {
      const res = await this.supabase.from('training_events').select('*');
      if (res.error) throw res.error;
      return res;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async removeUserFromTraining(uID: string, tID: string): Promise<any> {
    try {
      const res = await this.supabase
        .from('training_event_exercisers')
        .delete()
        .eq('user_id', uID)
        .eq('training_event_id', tID);
      if (res.error) throw res.error;
      return res;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
