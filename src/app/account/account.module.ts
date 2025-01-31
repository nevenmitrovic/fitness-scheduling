import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AccountComponent } from './account.component';

import { AccountRoutingModule } from './account.routing.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [SignInComponent, SignUpComponent, AccountComponent],
  imports: [CommonModule, ReactiveFormsModule, IonicModule, AccountRoutingModule],
})
export class AccountModule {}
