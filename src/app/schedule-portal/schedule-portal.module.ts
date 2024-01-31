import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffShiftScheduleComponent } from './staff-shift-schedule/staff-shift-schedule.component';
import { StaffComponent } from './staff/staff.component';
import { ShiftComponent } from './shift/shift.component';
import { PortalComponent } from './portal/portal.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    StaffShiftScheduleComponent,
    StaffComponent,
    ShiftComponent,
    PortalComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    StaffComponent,
    ShiftComponent,
    StaffShiftScheduleComponent,
    PortalComponent,
  ],
})
export class SchedulePortalModule {}
