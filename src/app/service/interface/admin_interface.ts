export interface CountData {
  totalclass: number;
  totalteacher: number;
  totalstudent: number;
  totalsubject: number;
}

export interface Subject {
  subject: string;
}

export interface ScheduleUpdateData {
  day: string;
  timeSlots: {
    '9:00-11:00': string;
    '11:30-1:30': string;
    '2:30-4:00': string;
    '4:00-6:00': string;
  };
}

interface ScheduleEntry {
  day: string;
  slots: {
    time: string;
    file: string;
  }[];
}

export interface ScheduleDocument {
  _id: string;
  class: string;
  submittion: ScheduleEntry[];
  status: string;
}

export interface ScheduleData {
  getdata: {
    day: string;
    slots: {
      _id: string;
      time: string;
      file: string | null;
    }[];
  }[];
}
export interface status {
  status: string;
}
export interface ClassFormData {
  name: string;
}

export interface editsubject {
  subject: string;
}

export interface Teacheradd {
  name: string;
  email: string;
  phone: string;
  password?: string;
  confirm?: string;
  subject: string;
}

export interface Student {
  name: string;
  email: string;
  phone: string;
  password?: string;
  confirm?: string;
  subject: string;
}
export interface studentvalue {
  getdata: getdatavalue[];
}
interface getdatavalue {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
}
export interface studentaddtoclass {
  students: string;
}

interface teacheraddclass {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  classes: string[];
  subjects: string;
}
export interface datateacherclass {
  getdata: teacheraddclass[];
}
export interface teacherremove {
  _id: string;
  name: string;
  email: string;

  phone: string;

  subjects: string;
}

export interface teacheraddtoclass {
  teachers: string;
}

export interface getsubject {
  getdata: datasubject[];
}
interface datasubject {
  _id: string;
  subject: string;
}

export interface getclass {
  getdata: getdataclassvalue[];
}
interface getdataclassvalue {
  _id: string;
  teachers: string[];
  students: string[];
  name: string;
}

export interface ScheduleData {
  getdata: {
    day: string;
    slots: {
      _id: string;
      time: string;
      file: string | null;
    }[];
  }[];
}

