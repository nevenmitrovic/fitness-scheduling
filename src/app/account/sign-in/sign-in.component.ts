import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoadingController, AlertController } from '@ionic/angular';

import { UserService } from 'src/app/api/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  standalone: false,
})
export class SignInComponent implements OnInit {
  signInForm!: FormGroup;

  private readonly formBuilder = inject(FormBuilder);
  private readonly loadingController = inject(LoadingController);
  private readonly router = inject(Router);
  private readonly userService = inject(UserService);
  private readonly alertController = inject(AlertController);

  constructor() {
    this.signInForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
    });
    this.userService.getCurrentUser().subscribe((u) => {
      if (u) {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnInit() {}

  async navigateToSignUp(): Promise<void> {
    this.router.navigate(['/account/sign-up']);
  }

  async signIn() {
    if (this.signInForm.invalid) {
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Signing in...',
    });
    await loading.present();
    try {
      const res = await this.userService.signIn(this.signInForm.value);
      if (res.error) {
        throw res.error;
      }
      await this.router.navigate(['/']);
    } catch (e) {
      console.error(e);
      const alert = await this.alertController.create({
        header: 'Greška',
        message: 'Neispravni podaci, pokusajte ponovo',
        buttons: ['OK'],
      });
      await alert.present();
    } finally {
      await loading.dismiss();
    }
  }
}
