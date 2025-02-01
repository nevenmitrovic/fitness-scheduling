import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  standalone: false,
})
export class SignInComponent implements OnInit {
  error = '';
  signInForm!: FormGroup;

  private readonly formBuilder = inject(FormBuilder);
  private readonly loadingController = inject(LoadingController);
  private readonly router = inject(Router);

  constructor() {
    this.signInForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
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
    this.signInForm.valueChanges.subscribe(() => {
      this.error = '';
    });
  }

  ngOnInit() {}

  navigateToSignUp() {
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
    await loading.dismiss();
  }
}
