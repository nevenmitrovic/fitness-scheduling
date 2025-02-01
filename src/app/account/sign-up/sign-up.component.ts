import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  standalone: false,
})
export class SignUpComponent implements OnInit {
  error = '';
  signUpForm!: FormGroup;

  private readonly formBuilder = inject(FormBuilder);
  private readonly loadingController = inject(LoadingController);
  private readonly router = inject(Router);

  constructor() {
    this.signUpForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      fullName: ['', [Validators.required, Validators.minLength(3)]],
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
    this.signUpForm.valueChanges.subscribe(() => {
      this.error = '';
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
    await loading.dismiss();
  }
}
