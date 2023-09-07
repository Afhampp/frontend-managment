export interface getassigment {
  getdata: Assignment[];
}

interface Assignment {
  class: string;
  file: string;
  from: string;
  name: string;
  submittion: Submission[];
  teacher: Teacher;
  to: string;
  _id: string;
  subfile?: string;
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

export interface getattendace {
  teacherAttendanceArray: attendacelist[];
}
interface attendacelist {
  absentCount: number;
  presentCount: number;
  teacherSubjects: string;
  teacherName: string;
  teacherId: string;
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

export interface login {
  email: string;
  password: string;
}

export interface notes {
  classes: classesvalue[];
  studentname: string;
  studentid: string;
  teachersData: teachervalue[];
}
interface classesvalue {
  _id: string;
  teachers: teachervalue[];
  name: string;
  students: string[];
}
interface teachervalue {
  _id: string;
  name: string;
}

export interface getnotes {
  getdata: getdatavalue[];
}
interface getdatavalue {
  _id: string;
  name: string;
  from: string;
  file: string;
  class: string;
  teacher: teachernotes;
}
interface teachernotes {
  _id: string;
  subjects: string;
  phone: string;
  password: string;
  name: string;
  email: string;
  classes: string[];
}
export interface profile {
  data: profiledata;
}

interface profiledata {
  _id: string;
  phone: string;
  password: string;
  name: string;
  image: string;
  email: string;
  classes: string;
}

export interface getclass {
  getdata: getdatavalue[];
}
interface getdatavalue {
  slots: slotdatavalue[];
  _id: string;
  day: string;
}
interface slotdatavalue {
  _id: string;
  time: string;
  file: string;
}
