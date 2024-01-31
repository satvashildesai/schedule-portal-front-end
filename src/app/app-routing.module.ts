import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffComponent } from './schedule-portal/staff/staff.component';
import { ShiftComponent } from './schedule-portal/shift/shift.component';
import { StaffShiftScheduleComponent } from './schedule-portal/staff-shift-schedule/staff-shift-schedule.component';
import { LoginComponent } from './security/login/login.component';
import { PortalComponent } from './schedule-portal/portal/portal.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'portal',
    component: PortalComponent,
    children: [
      // { path: '', component: StaffComponent },
      { path: 'staff', component: StaffComponent },
      { path: 'shift', component: ShiftComponent },
      { path: 'schedule', component: StaffShiftScheduleComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
