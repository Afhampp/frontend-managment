export interface logindata {
  name: string;
  password: string;
}

export interface RowData {
  rowdataid: string;
}

export interface ScheduleData {
  _id: string;
  day: string;
  slots: slotsdatavalue[];
}
interface slotsdatavalue{
  _id:string,
  time:string,
  file:string
}
export interface Student {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface teacheraddclass {
  _id: string;
  name: string;
  email: string;
  password?: string;
  phone: string;
  classes?: string[];
  subjects: string;
}

export interface addsubject {
  status: string;
}

export interface datasubject {
  _id: string;
  subject: string;
}
