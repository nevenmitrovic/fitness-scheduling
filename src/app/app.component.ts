import { Component, inject, HostListener } from '@angular/core';

import { UserService } from './api/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  private readonly userService = inject(UserService);

  // @HostListener('window:unload', ['$event'])
  // onUnload(event: Event): void {
  //   localStorage.clear();
  //   this.userService.signOut();
  // }
}
