import { Component, OnInit, ViewChild } from '@angular/core';
import { StaffApiServiceService } from '../../services/staff-api-service.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Staff } from '../../data-modal/staff';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.css',
})
export class StaffComponent implements OnInit {
  dateTimeList: any[] = [];
  staffList: any;
  vStaffDetails!: Staff;

  filterStartDate: any;
  filterEndDate: any;
  showBtn: boolean = false;

  editStaffModal = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
  });

  constructor(
    private staffApi: StaffApiServiceService,
    private toastr: ToastrService
  ) {
    this.displayAllStaff();
  }

  ngOnInit(): void {
    const dateInputs = document.getElementsByClassName(
      'custom-date'
    ) as HTMLCollectionOf<HTMLInputElement>;
    if (dateInputs.length > 0) {
      const date = new Date();
      for (const dateInput of Array.from(dateInputs)) {
        if (date.getMonth() < 9) {
          dateInput.min =
            date.getFullYear() +
            '-0' +
            (date.getMonth() + 1) +
            '-' +
            date.getDate();
        } else {
          dateInput.min =
            date.getFullYear() +
            '-' +
            (date.getMonth() + 1) +
            '-' +
            date.getDate();
        }
      }
    }
  }

  saveStaff(staff: any) {
    staff.availableDateTime = this.dateTimeList;
    this.staffApi.saveStaff(staff).subscribe(
      (res: any) => {
        this.displayAllStaff();
        this.toastr.success(res.message);
      },
      (err: any) => {
        this.displayAllStaff();
        this.toastr.error(err.error.message);
      }
    );
    this.dateTimeList.length = 0;
  }

  editStaff() {
    let editedStaff: {
      id: string | null | undefined;
      name: string | null | undefined;
      availableDateTime: any;
    } = { id: '', name: '', availableDateTime: [{}] };

    editedStaff.id = this.editStaffModal.value.id;
    editedStaff.name = this.editStaffModal.value.name;
    editedStaff.availableDateTime = this.dateTimeList;

    this.staffApi.editStaff(editedStaff).subscribe(
      (res: any) => {
        this.displayAllStaff();
        this.toastr.success(res.message);
      },
      (err: any) => {
        this.displayAllStaff();
        this.toastr.error(err.error.message);
      }
    );
  }

  getStaffByDate(dateFilter: any) {
    let dateRange: string[] = [];
    dateRange.push(dateFilter.fromDate);
    dateRange.push(dateFilter.toDate);

    this.staffApi.getStaffByDate(dateRange).subscribe(
      (res: any) => {
        this.staffList = res.data;
        this.showBtn = true;
      },
      (err: any) => {
        this.toastr.error(err.message);
      }
    );
  }

  deleteStaff(staffId: any) {
    this.staffApi.deleteStaff(staffId).subscribe(
      (res: any) => {
        this.displayAllStaff();
        this.toastr.success(res.message);
      },
      (err: any) => {
        this.displayAllStaff();
        this.toastr.error(err.error.message);
      }
    );
  }

  displayAllStaff() {
    this.staffApi.getAllStaffs().subscribe((staffDetails: any) => {
      this.staffList = staffDetails.data;
      this.showBtn = false;
      this.filterStartDate = '';
      this.filterEndDate = '';
    });
  }

  // Display on view staff modal
  getStaffDetails(staffDetails: any) {
    this.vStaffDetails = staffDetails;
  }

  // Remove available date time from date time list while editing
  removeDateTime(dateTime: any) {
    this.dateTimeList.splice(this.dateTimeList.indexOf(dateTime), 1);
  }

  getStaffToEdit(staff: any) {
    this.editStaffModal = new FormGroup({
      id: new FormControl(staff.id),
      name: new FormControl(staff.name),
    });
    this.dateTimeList.length = 0;
    let dtList: [{ id: any; date: any; startTime: string; endTime: string }] =
      staff.availableDateTime;
    for (let i in dtList) {
      this.dateTimeList.push({
        date: dtList[i].date,
        startTime: dtList[i].startTime,
        endTime: dtList[i].endTime,
      });
    }
  }

  getAvailableDateTime(sDate: any, eDate: any, startTime: any, endTime: any) {
    let from = new Date(sDate);
    let to = new Date(eDate);

    for (let date = from; date <= to; date.setDate(date.getDate() + 1)) {
      this.dateTimeList.push({
        date:
          date.getFullYear() +
          '-' +
          ((date.getMonth() + 1).toString().length < 2
            ? '0' + (date.getMonth() + 1)
            : date.getMonth() + 1) +
          '-' +
          (date.getDate().toString().length < 2
            ? '0' + date.getDate()
            : date.getDate()),
        startTime: Number(startTime.slice(0, 2)),
        endTime: Number(endTime.slice(0, 2)),
      });
    }
  }
}
