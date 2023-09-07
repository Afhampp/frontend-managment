export interface dashboardvalue {
  classAttendance: classattendacevalue[];
  totalClasses: number;
  totalStudents: number;
}
interface classattendacevalue {
  attendanceCount: number;
  className: string;
}
export interface classattendace {
  attendanceCount: number;
  className: string;
}
export interface RowData {
  classid: string;
  studentId?: string;
}

export interface ChatMessage {
  sender: string;
  senderid: string;
  timestamp: Date;
  content: string;
  receiver?: string;
}

export interface Student {
  _id: string;
  name: string;
  selected?: string;
  teacherid?: string;
}
export interface Group {
  classid: string;
  classname: string;
  selected?: string;
  teacherid?: string;
}
