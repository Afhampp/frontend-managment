export interface Assignment {
  class: string;
  file: string;
  from: string;
  name: string;
  submittion: Submission[];
  teacher: Teacher;
  to: string;
  _id: string;
  subfile?: string; // Optional property to store submission file
}

interface Submission {
  student: string;
  file: string;
}

interface Teacher {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface Dashboardvalue {
  teachercount: number;
  teacherData: teacherdatavalue[];
}
interface teacherdatavalue {
  totalMarks: number;
  teacherName: string;
  presentCount: number;
  absentCount: number;
}

export interface ChatMessage {
  sender: string;
  senderid: string;
  timestamp: Date;
  content: string;
  receiver?: string; // Make receiver property optional
}

export interface teacher {
  _id: string;
  name: string;
  selected?: string;
  studentid?: string;
}

export interface Group {
  _id: string;
  name: string;
  selected?: string;
  studentid?: string;
}
