import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StaffShiftAssignApiServiceService {
  getStaffShiftAssignUrl = 'http://localhost:8081/portal/assign';
  putStaffShiftAssignUrl = 'http://localhost:8081/portal/assign';
  deleteStaffShiftAssignUrl = 'http://localhost:8081/portal/assign?';

  constructor(private http: HttpClient) {}

  getAllAssignment(): any {
    const token = 'Bearer ' + localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http.get(this.getStaffShiftAssignUrl, { headers });
  }

  assignStaffShift(assignment: any): any {
    const token = 'Bearer ' + localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http.put(this.putStaffShiftAssignUrl, assignment, { headers });
  }

  deleteStaffShiftAssignment(assignId: any, assignDate: any): any {
    const url =
      this.deleteStaffShiftAssignUrl + 'id=' + assignId + '&date=' + assignDate;
    const token = 'Bearer ' + localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http.delete(url, { headers });
  }
}
