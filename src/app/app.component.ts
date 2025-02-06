import { Component, inject, OnInit } from '@angular/core';

import { UserService } from './api/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  private readonly userService = inject(UserService);

  ngOnInit(): void {
    this.userService.onAuthStateChange();
  }

  // @HostListener('window:unload', ['$event'])
  // onUnload(event: Event): void {
  //   localStorage.clear();
  //   this.userService.signOut();
  // }
}
