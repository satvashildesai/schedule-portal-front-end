import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffShiftScheduleComponent } from './staff-shift-schedule.component';

describe('StaffShiftScheduleComponent', () => {
  let component: StaffShiftScheduleComponent;
  let fixture: ComponentFixture<StaffShiftScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StaffShiftScheduleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StaffShiftScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
