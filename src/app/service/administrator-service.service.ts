import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,} from '@angular/common/http';
import { Observable } from 'rxjs';
import { logindata } from '../administrator/interface/logininterface';
import { environment } from 'src/environments/environment';
import {
  CountData,
  Subject,
  ScheduleUpdateData,
  ScheduleDocument,
  status,
  ClassFormData,
  Teacheradd,
  Student,
  studentvalue,
  studentaddtoclass,
  datateacherclass,
  teacheraddtoclass,
  teacherremove,
  editsubject,
  getsubject,
  getclass,
} from '../service/interface/admin_interface';

@Injectable({
  providedIn: 'root',
})
export class AdministratorServiceService {
  constructor(private http: HttpClient) {}
  private url = environment.adminUrl;

  adminlogin(data: logindata): Observable<any> {
    return this.http.post<logindata>(this.url + 'login', data);
  }

  getcount(): Observable<CountData> {
    return this.http.get<CountData>(this.url + 'getcount');
  }

  teacheraddd(data: Teacheradd): Observable<status> {
    return this.http.post<status>(this.url + 'addteacher', data);
  }
  getteacher(): Observable<datateacherclass> {
    const userType = 'admin';
    const headers = new HttpHeaders().set('userType', userType);
    const requestOptions = { headers: headers };
    return this.http.get<datateacherclass>(
      this.url + 'getteacher',
      requestOptions
    );
  }
  updateteacher(data: Teacheradd, id: string): Observable<any> {
    return this.http.put<any>(this.url + 'updatedata/' + id, data);
  }
  deleteteacher(id: string): Observable<any> {
    return this.http.delete<any>(this.url + 'deletedata/' + id);
  }
  subjectadd(data: editsubject): Observable<Subject> {
    return this.http.post<Subject>(this.url + 'subjectadd', data);
  }
  getsubject(): Observable<getsubject> {
    return this.http.get<getsubject>(this.url + 'getsubject');
  }
  updatesubejct(data: editsubject, id: string): Observable<any> {
    return this.http.put<any>(this.url + 'updatesubject/' + id, data);
  }
  deletesubject(id: string): Observable<any> {
    return this.http.delete<any>(this.url + 'deletesubject/' + id);
  }
  getstudent(): Observable<studentvalue> {
    return this.http.get<studentvalue>(this.url + 'getstudent');
  }
  updatestudent(data: Student, id: string): Observable<status> {
    return this.http.put<status>(this.url + 'updatestudent/' + id, data);
  }
  deletestudent(id: string): Observable<any> {
    return this.http.delete<any>(this.url + 'deletestudent/' + id);
  }
  addstudent(data: Student): Observable<status> {
    return this.http.post<status>(this.url + 'addstudent', data);
  }
  addclass(data: ClassFormData): Observable<status> {
    return this.http.post<status>(this.url + 'addclass', data);
  }
  getclass(): Observable<getclass> {
    return this.http.get<getclass>(this.url + 'getclass');
  }
  updateclass(data: ClassFormData, id: string): Observable<status> {
    return this.http.put<status>(this.url + 'updateclass/' + id, data);
  }
  deleteclass(id: string): Observable<any> {
    return this.http.delete<any>(this.url + 'deleteclass/' + id);
  }
  getclassid(id: string): Observable<any> {
    return this.http.get<any>(this.url + 'getclass/' + id);
  }
  addteacherinclass(data: teacheraddtoclass, id: string): Observable<any> {
    return this.http.post<any>(this.url + 'teachertoclass/' + id, data);
  }
  deleteteacherfromclass(data: teacherremove, id: string): Observable<any> {
    return this.http.put<any>(this.url + 'removeteacher/' + id, data);
  }
  getclassstudentid(id: any): Observable<any> {
    return this.http.get<any>(this.url + 'getclassstudent/' + id);
  }
  addstudentinclass(data: any, id: string): Observable<any> {
    return this.http.post<any>(this.url + 'studenttoclass/' + id, data);
  }
  removestudent(data: studentaddtoclass, id: any): Observable<any> {
    return this.http.put<any>(this.url + 'removestudent/' + id, data);
  }
  getclassschedule(id: string): Observable<any> {
    return this.http.get<any>(this.url + 'getclassschedule/' + id);
  }

  updateshedule(data: ScheduleUpdateData,id: string): Observable<ScheduleDocument> {
    return this.http.put<ScheduleDocument>(this.url + 'updateschedule/' + id,data
);
  }
}
