import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StaffApiServiceService {
  // Url to access staff's apis
  getStaffByDateUrl = 'http://localhost:8081/portal/staff/date';
  getAllStaffsUrl = 'http://localhost:8081/portal/staff';
  deleteStaffUrl = 'http://localhost:8081/portal/staff/';
  postStaffUrl = 'http://localhost:8081/portal/staff';
  putStaffUrl = 'http://localhost:8081/portal/staff';

  constructor(private http: HttpClient) {}

  getAllStaffs(): any {
    const token = 'Bearer ' + localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http.get(this.getAllStaffsUrl, { headers });
  }

  getStaffByDate(dateRange: string[]): any {
    const token = 'Bearer ' + localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http.get(this.getStaffByDateUrl + '/' + dateRange.toString(), {
      headers,
    });
  }

  saveStaff(staff: any): any {
    const token = 'Bearer ' + localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http.post(this.postStaffUrl, staff, { headers });
  }

  editStaff(editedStaff: any): any {
    const token = 'Bearer ' + localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http.put(this.putStaffUrl, editedStaff, { headers });
  }

  deleteStaff(staffId: any): any {
    const url = this.deleteStaffUrl + staffId;
    const token = 'Bearer ' + localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http.delete(url, { headers });
  }
}
