import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  addassignment,
  getassigment,
  addattendance,
  getteacheid,
  dashboardvalue,
  login,
  updatemark,
  status,
  getteachervalue,
  getattendacedata,
  updateattendace,
  attendacedatastaus,
  assigentsubmittedlist,
  getnotesdata,
} from '../service/interface/teacher_interface';

@Injectable({
  providedIn: 'root',
})
export class TeacherServiceService {
  constructor(private http: HttpClient) {}
  private url = environment.teacherUrl;

  teacherlogin(data: login): Observable<any> {
    return this.http.post<any>(this.url + 'login', data);
  }
  getclasses(): Observable<addassignment> {
    const userType = 'teacher';
    const headers = new HttpHeaders().set('userType', userType);
    const requestOptions = { headers: headers };
    return this.http.get<addassignment>(
      this.url + 'getclasses',
      requestOptions
    );
  }
  getstudentfromclass(id: string): Observable<getteachervalue> {
    return this.http.get<getteachervalue>(
      this.url + 'getstuentfromclass/' + id
    );
  }
  assigmentquestion(data: FormData): Observable<any> {
    const userType = 'teacher';
    const headers = new HttpHeaders().set('userType', userType);
    const requestOptions = { headers: headers };
    return this.http.post<any>(
      this.url + 'assigemntquestion',
      data,
      requestOptions
    );
  }
  showassigment(): Observable<getassigment> {
    const userType = 'teacher';
    const headers = new HttpHeaders().set('userType', userType);
    const requestOptions = { headers: headers };
    return this.http.get<getassigment>(
      this.url + 'showassigment',
      requestOptions
    );
  }

  getbaseurl(fileName: any, options: any): Observable<any> {
    return this.http.get<any>(this.url + 'getbaseurl/' + fileName, options);
  }

  updateassigment(data: any, id: any): Observable<any> {
    return this.http.put<any>(this.url + 'updateassignment/' + id, data);
  }
  deleteassigment(id: any): Observable<any> {
    return this.http.delete<any>(this.url + 'assigmentdelete/' + id);
  }

  getassigmentsubmitted(id: string): Observable<assigentsubmittedlist> {
    return this.http.get<assigentsubmittedlist>(
      this.url + 'getassigmentsubmitted/' + id
    );
  }
  getteacherid(): Observable<getteacheid> {
    const userType = 'teacher';
    const headers = new HttpHeaders().set('userType', userType);
    const requestOptions = { headers: headers };
    return this.http.get<getteacheid>(
      this.url + 'getteacherid',
      requestOptions
    );
  }

  shownotes(): Observable<getnotesdata> {
    const userType = 'teacher';
    const headers = new HttpHeaders().set('userType', userType);
    const requestOptions = { headers: headers };
    return this.http.get<getnotesdata>(this.url + 'shownotes', requestOptions);
  }

  notessubmittion(data: FormData): Observable<status> {
    const userType = 'teacher';
    const headers = new HttpHeaders().set('userType', userType);
    const requestOptions = { headers: headers };
    return this.http.post<status>(
      this.url + 'notesubmittion',
      data,
      requestOptions
    );
  }

  upadatenotes(data: FormData, id: string): Observable<status> {
    return this.http.put<status>(this.url + 'updatenotes/' + id, data);
  }
  deletenotes(id: any): Observable<any> {
    return this.http.delete<any>(this.url + 'deletenotes/' + id);
  }

  getattendacedata(id: string): Observable<getattendacedata> {
    const userType = 'teacher';
    const headers = new HttpHeaders().set('userType', userType);
    const requestOptions = { headers: headers };
    return this.http.get<getattendacedata>(
      this.url + 'getattendancedata/' + id,
      requestOptions
    );
  }
  addattendace(data: addattendance): Observable<{ status: string }> {
    return this.http.put<{ status: string }>(this.url + 'addattendace', data);
  }
  getattendace(
    rowDataid: string,
    studentId: string
  ): Observable<attendacedatastaus[]> {
    const userType = 'teacher';
    const headers = new HttpHeaders().set('userType', userType);
    const requestOptions = { headers: headers };

    return this.http.get<attendacedatastaus[]>(
      `${this.url}getattedancedate/${rowDataid}?studentId=${studentId}`,
      requestOptions
    );
  }
  updateattendace(data: updateattendace): Observable<status> {
    return this.http.put<status>(this.url + 'updateattendace', data);
  }

  updatemark(data: updatemark): Observable<status> {
    const userType = 'teacher';
    const headers = new HttpHeaders().set('userType', userType);
    const requestOptions = { headers: headers };
    return this.http.put<status>(this.url + 'updatemark', data, requestOptions);
  }

  getcount(): Observable<dashboardvalue> {
    const userType = 'teacher';
    const headers = new HttpHeaders().set('userType', userType);
    const requestOptions = { headers: headers };
    return this.http.get<dashboardvalue>(`${this.url}getcount`, requestOptions);
  }
}
