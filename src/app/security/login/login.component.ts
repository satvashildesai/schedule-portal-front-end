import { Component } from '@angular/core';
import { SecurityService } from '../../services/security.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
@Injectable({
  providedIn: 'root',
})
export class LoginComponent {
  constructor(
    private securityApi: SecurityService,
    private router: Router,
    private toastr: ToastrService
  ) { }
  
  un: any;
  pw: any;

  doAuthenticate(credentials: any) {
    this.un = '';
    this.pw = '';

    this.securityApi.authenticateUser(credentials).subscribe(
      (resp: any) => {
        localStorage.setItem('token', resp.data[0]);
        this.toastr.success('Login successfully.');
        this.router.navigate(['portal/staff']);
      },
      (err: any) => {
        this.toastr.error('Please enter valid user credentials!');
      }
    );
  }

  doLogout() {
    localStorage.removeItem('token');
    this.toastr.success('Logout successfully.');
    this.router.navigate(['login']);
  }
}
