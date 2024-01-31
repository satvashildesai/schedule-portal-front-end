import { Component } from '@angular/core';
import { StaffShiftAssignApiServiceService } from '../../services/staff-shift-assign-api-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-staff-shift-schedule',
  templateUrl: './staff-shift-schedule.component.html',
  styleUrl: './staff-shift-schedule.component.css',
})
export class StaffShiftScheduleComponent {
  staffShiftAssignList: [
    {
      shift: {
        id: number;
        startTime: number;
        endTime: number;
        requiredStaffCount: number;
        date: string;
      };
      staffList: [{ id: number; name: string }];
    }
  ] = [
    {
      shift: {
        id: 0,
        startTime: 0,
        endTime: 0,
        requiredStaffCount: 0,
        date: '',
      },
      staffList: [{ id: 0, name: '' }],
    },
  ];

  staffIdList: any[] = [];
  vAssignment: any;

  constructor(
    private assignApi: StaffShiftAssignApiServiceService,
    private toastr: ToastrService
  ) {
    this.staffShiftAssignList.splice(0, 1);
    this.displayAssignment();
  }

  assignStaffShift(assignment: any) {
    let saveAssignment = {
      shiftSheduleId: assignment.assignShift,
      staffMemberIds: this.staffIdList,
    };
    this.assignApi.assignStaffShift(saveAssignment).subscribe(
      (res: any) => {
        this.displayAssignment();
        this.toastr.success(res.message);
      },
      (err: any) => {
        this.displayAssignment();
        this.toastr.error(err.error.message);
      }
    );
  }

  deleteAssignment(assignId: any, assignDate: any) {
    this.assignApi.deleteStaffShiftAssignment(assignId, assignDate).subscribe(
      (res: any) => {
        this.displayAssignment();
        this.toastr.success(res.message);
      },
      (err: any) => {
        this.displayAssignment();
        this.toastr.error(err.error.message);
      }
    );
  }

  displayAssignment() {
    this.staffShiftAssignList.splice(0, this.staffShiftAssignList.length);
    this.assignApi.getAllAssignment().subscribe(
      (resp: any) => {
        this.mapResponse(resp.data);
      },
      (err: any) => {
        this.toastr.error(err.error.message);
      }
    );
  }

  getScheduleToView(assignment: any) {
    this.vAssignment = assignment;
  }

  getStaffIdList(staffId: any) {
    this.staffIdList.push(staffId);
  }

  removeStaff(staff: any) {
    this.staffIdList.splice(this.staffIdList.indexOf(staff), 1);
  }

  mapResponse(assignDataList: any) {
    let visitedShiftIds = [0];
    let shiftId: number;

    for (let assignData of assignDataList) {
      shiftId = assignData.shiftSheduleId.id;

      let staffs: [{ id: number; name: string; availableDateTime: [{}] }] = [
        { id: 0, name: '', availableDateTime: [{}] },
      ];
      staffs.splice(0, staffs.length);

      if (!visitedShiftIds.includes(shiftId)) {
        visitedShiftIds.push(shiftId);
        for (let data of assignDataList) {
          if (data.shiftSheduleId.id === shiftId) {
            staffs.push(data.staffMemberId);
          }
        }

        this.staffShiftAssignList.push({
          shift: assignData.shiftSheduleId,
          staffList: staffs,
        });
      }
    }
  }
}
