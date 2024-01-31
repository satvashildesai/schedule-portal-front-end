import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  authenticationUrl = 'http://localhost:8081/login';

  constructor(private http: HttpClient) {}

  authenticateUser(credentials: any): any {
    return this.http.post(this.authenticationUrl, credentials);
  }
}
