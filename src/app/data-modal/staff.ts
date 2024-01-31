export interface Staff {
  id: number;
  name: string;
  availableDateTime: {
    id: number;
    date: Date;
    startTime: number;
    endTime: number;
    scheduled: boolean;
  }[];
}

export interface scheduleRequest {
  shiftSheduleId: number;
  staffMemberIds: number[];
}
