export interface addassignment {
  clasvalue: clasvaluedata[];
}
interface clasvaluedata {
  _id: string;
  name: string;
  teachers: string[];
  students: string[];
}

export interface getassigment {
  getdata: Assignment[];
}

interface Assignment {
  class: string;
  file: string;
  from: string;
  name: string;
  submittion: Submission[];
  teacher: string;
  to: string;
  _id: string;
  subfile?: string;
}

interface Submission {
  student: string;
  file: string;
}

export interface addattendance {
  classid: string;
  teacherid: string;
  studentid: string;
  status: string;
}

export interface getteacheid {
  allStudentsData: studentdayavalue[];
  classIds: classidvalue[];
  teachername: string;
  teacherid: string;
}
interface studentdayavalue {
  _id: string;
  name: string;
}
interface classidvalue {
  classname: string;
  classid: string;
}

export interface dashboardvalue {
  classAttendance: classattendacevalue[];
  totalClasses: number;
  totalStudents: number;
}
interface classattendacevalue {
  attendanceCount: number;
  className: string;
}

export interface login {
  email: string;
  password: string;
}

export interface updatemark {
  _id: string;
  mark: number;
}

export interface status {
  status: string;
}

export interface getteachervalue {
  studentData: stuentDatavalue[];
}

interface stuentDatavalue {
  _id: string;
  phone: string;
  password: string;
  name: string;
  image: string;
  email: string;
  classes: string;
}

export interface getattendacedata {
  studentsWithStatusCount: studentsWithStatusCountdata[];
}
interface studentsWithStatusCountdata {
  absentCount: number;
  student: studentstatus[];
  presentCount: number;
  attendance: attendacedatastaus[];
}
export interface attendacedatastaus {
  date: string;
  status: string;
  _id: String;
}
interface studentstatus {
  _id: string;
  name: string;
}

export interface updateattendace {
  classid: string;
  teacherid: string;
  studentid: string;
  date: string;
  status: string;
}
export interface assigentsubmittedlist {
  submittionWithName: assigentsubmittedl[];
}

interface assigentsubmittedl {
  date: string;
  file: string;
  mark: number;
  _id: string;
  name: string;
}

export interface getnotesdata {
  getdata: getdatavaluesfromnotes[];
}
interface getdatavaluesfromnotes {
  _id: string;
  teacher: string;
  from: string;
  file: string;
  class: string;
  name: String;
}
