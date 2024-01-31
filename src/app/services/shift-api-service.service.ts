import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShiftApiServiceService {
  // Url to access shift's apis
  getAvailableStaffUrl = 'http://localhost:8081/portal/staff/available?';
  getShiftByDateUrl = 'http://localhost:8081/portal/shift/daterange?';
  getAllShiftUrl = 'http://localhost:8081/portal/shift';
  deleteShiftUrl = 'http://localhost:8081/portal/shift/';
  postShiftUrl = 'http://localhost:8081/portal/shift';
  putShiftUrl = 'http://localhost:8081/portal/shift';

  // Create object of HttpClient to hit the request
  constructor(private http: HttpClient) {}

  // Get available staff for the given shift
  getAvailableStaff(date: string, startTime: string, endTime: string): any {
    const token = 'Bearer ' + localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', token);
    const url =
      this.getAvailableStaffUrl +
      'date=' +
      date +
      '&startTime=' +
      startTime +
      '&endTime=' +
      endTime;
    return this.http.get(url, { headers });
  }

  // Get shift by date
  getShiftByDate(dateRange: string[]): any {
    const token = 'Bearer ' + localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', token);
    const url =
      this.getShiftByDateUrl +
      'sDate=' +
      dateRange[0] +
      '&eDate=' +
      dateRange[1];
    return this.http.get(url, { headers });
  }

  // Get all shits from server
  getAllShift(): any {
    const token = 'Bearer ' + localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http.get(this.getAllShiftUrl, { headers });
  }

  // Save the shift in database
  saveShift(shift: any): any {
    const token = 'Bearer ' + localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http.post(this.postShiftUrl, shift, { headers });
  }

  // Edit the existing shift
  editShift(shift: any): any {
    const token = 'Bearer ' + localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http.put(this.putShiftUrl, shift, { headers });
  }

  // Delete shift from database
  deleteShift(shiftId: any): any {
    const token = 'Bearer ' + localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', token);
    const url = this.deleteShiftUrl + shiftId;
    return this.http.delete(url, { headers });
  }
}
