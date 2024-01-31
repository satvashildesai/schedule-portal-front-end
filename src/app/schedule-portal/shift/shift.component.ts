import { Component, OnInit, numberAttribute } from '@angular/core';
import { ShiftApiServiceService } from '../../services/shift-api-service.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Staff } from '../../data-modal/staff';
import { scheduleRequest } from '../../data-modal/staff';
import { StaffShiftAssignApiServiceService } from '../../services/staff-shift-assign-api-service.service';

@Component({
  selector: 'app-shift',
  templateUrl: './shift.component.html',
  styleUrl: './shift.component.css',
})
export class ShiftComponent implements OnInit {
  // Store list of shift
  shiftList: any;
  // Store staff id to schedule the shift
  shift: any;
  // Store start and end date to search the shifts between two dates
  filterStartDate: string = '';
  filterEndDate: string = '';
  // Button to clear date filter show all the shifts
  showBtn: boolean = false;
  // Available staff list for given shift
  availableStaffList: Staff[] = [];
  // Assigned staff list
  assignedStaffList: Staff[] = [];
  // Display shift data on edit modal
  editShiftModal = new FormGroup({
    id: new FormControl(''),
    date: new FormControl(''),
    startTime: new FormControl(''),
    endTime: new FormControl(''),
    requiredStaffCount: new FormControl(''),
  });

  constructor(
    private shiftApi: ShiftApiServiceService,
    private toastr: ToastrService,
    private assignApi: StaffShiftAssignApiServiceService
  ) {
    this.displayAllShift();
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

  saveShift(shiftDetails: any) {
    this.shiftApi.saveShift(shiftDetails).subscribe(
      (res: any) => {
        this.displayAllShift();
        this.toastr.success(res.message);
      },
      (err: any) => {
        this.displayAllShift();
        this.toastr.error(err.error.message);
      }
    );
  }

  editShift() {
    this.shiftApi.editShift(this.editShiftModal.value).subscribe(
      (res: any) => {
        this.displayAllShift();
        this.toastr.success(res.message);
      },
      (err: any) => {
        this.displayAllShift();
        this.toastr.error(err.error.message);
      }
    );
  }

  deleteShift(shiftId: any) {
    this.shiftApi.deleteShift(shiftId).subscribe(
      (res: any) => {
        this.displayAllShift();
        this.toastr.success(res.message);
      },
      (err: any) => {
        this.displayAllShift();
        this.toastr.error(err.error.message);
      }
    );
  }

  displayShiftByDate(dateFilter: any) {
    let dateRange: string[] = [];
    dateRange.push(dateFilter.fromDate);
    dateRange.push(dateFilter.toDate);

    this.shiftApi.getShiftByDate(dateRange).subscribe(
      (res: any) => {
        this.shiftList = res.data;
        this.showBtn = true;
      },
      (err: any) => {
        this.toastr.error(err.message);
      }
    );
  }

  displayAllShift() {
    this.shiftApi.getAllShift().subscribe((res: any) => {
      this.shiftList = res.data;
      this.showBtn = false;
      this.filterStartDate = '';
      this.filterEndDate = '';
    });
  }

  assignStaffShift() {
    let saveAssignment: scheduleRequest = {
      shiftSheduleId: 0,
      staffMemberIds: [],
    };
    console.log(this.shift.id);
    saveAssignment.shiftSheduleId = this.shift.id;
    for (let staff of this.assignedStaffList) {
      saveAssignment.staffMemberIds.push(staff.id);
      console.log(saveAssignment.staffMemberIds);
    }

    this.assignApi.assignStaffShift(saveAssignment).subscribe(
      (res: any) => {
        this.toastr.success(res.message);
        this.displayAllShift();
      },
      (err: any) => {
        console.log(err);
        this.toastr.error(err.error.message);
      }
    );
  }

  getAvailableStaff(shift: any) {
    this.shift = shift;
    this.shiftApi
      .getAvailableStaff(shift.date, shift.startTime, shift.endTime)
      .subscribe(
        (res: any) => {
          this.availableStaffList = res.data;
          this.assignedStaffList = [];
        },
        (err: any) => {
          this.availableStaffList = [];
          this.assignedStaffList = [];
          this.toastr.error(err.error.message);
        }
      );
  }

  assignAddStaff(staff: any) {
    this.assignedStaffList.push(staff);
    this.availableStaffList.splice(this.availableStaffList.indexOf(staff), 1);
  }

  assignRemoveStaff(staff: any) {
    this.availableStaffList.push(staff);
    this.assignedStaffList.splice(this.assignedStaffList.indexOf(staff), 1);
  }

  getShiftToEdit(shift: any) {
    this.editShiftModal = new FormGroup({
      id: new FormControl(shift.id),
      date: new FormControl(shift.date),
      startTime: new FormControl(shift.startTime),
      endTime: new FormControl(shift.endTime),
      requiredStaffCount: new FormControl(shift.requiredStaffCount),
    });
  }
}
