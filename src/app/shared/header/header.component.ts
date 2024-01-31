import { Component } from '@angular/core';
import { LoginComponent } from '../../security/login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private auth: LoginComponent) {}

  doLogout() {
    this.auth.doLogout();
  }
}
