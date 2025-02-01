import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoadingController, AlertController } from '@ionic/angular';

import { UserService } from 'src/app/api/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  standalone: false,
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;

  private readonly formBuilder = inject(FormBuilder);
  private readonly loadingController = inject(LoadingController);
  private readonly router = inject(Router);
  private readonly alertController = inject(AlertController);
  private readonly userService = inject(UserService);

  constructor() {
    this.signUpForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', [Validators.required]],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(\+3816|06)(([0-6]|[8-9])\d{6,7}|(77|78)\d{5,6})$/
          ),
        ],
      ],
    });
  }

  ngOnInit() {}

  navigateToSignIn() {
    this.router.navigate(['/account/sign-in']);
  }

  async signUp() {
    if (this.signUpForm.invalid) {
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Signing up...',
    });
    await loading.present();
    try {
      const res = await this.userService.signUp(this.signUpForm.value);
      console.log(res);
      this.router.navigate(['/account/sign-in']);
    } catch (e) {
      console.error(e);
      const alert = await this.alertController.create({
        header: 'Greška',
        message: 'Neispravni podaci',
        buttons: ['OK'],
      });
      await alert.present();
    } finally {
      await loading.dismiss();
    }
  }
}
