import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  getassigment,
  getattendace,
  Dashboardvalue,
  login,
  notes,
  getnotes,
  profile,
} from '../service/interface/student_inteface';

@Injectable({
  providedIn: 'root',
})
export class StudentServiceService {
  constructor(private http: HttpClient) {}
  private url = environment.studentUrl;

  studentlogin(data: login): Observable<any> {
    return this.http.post<any>(this.url + 'login', data);
  }

  getassignemnt(): Observable<getassigment> {
    const userType = 'student';
    const headers = new HttpHeaders().set('userType', userType);
    const requestOptions = { headers: headers };
    return this.http.get<getassigment>(
      this.url + 'getassigment',
      requestOptions
    );
  }
  assigemntsubmittion(data: FormData, id: string): Observable<any> {
    const userType = 'student';
    const headers = new HttpHeaders().set('userType', userType);
    const requestOptions = { headers: headers };
    return this.http.put<any>(
      this.url + 'assigmentsubmittion/' + id,
      data,
      requestOptions
    );
  }
  getstudentid(): Observable<notes> {
    const userType = 'student';
    const headers = new HttpHeaders().set('userType', userType);
    const requestOptions = { headers: headers };
    return this.http.get<notes>(this.url + 'getstudentid', requestOptions);
  }

  getnotes(): Observable<getnotes> {
    const userType = 'student';
    const headers = new HttpHeaders().set('userType', userType);
    const requestOptions = { headers: headers };
    return this.http.get<getnotes>(this.url + 'getnotes', requestOptions);
  }

  getattendacedata(): Observable<getattendace> {
    const userType = 'student';
    const headers = new HttpHeaders().set('userType', userType);
    const requestOptions = { headers: headers };
    return this.http.get<getattendace>(
      this.url + 'getattendace',
      requestOptions
    );
  }
  getclass(): Observable<{ classid: string }> {
    const userType = 'student';
    const headers = new HttpHeaders().set('userType', userType);
    const requestOptions = { headers: headers };
    return this.http.get<{ classid: string }>(
      this.url + 'getclass',
      requestOptions
    );
  }

  getcountstudent(): Observable<Dashboardvalue> {
    const userType = 'student';
    const headers = new HttpHeaders().set('userType', userType);
    const requestOptions = { headers: headers };
    return this.http.get<Dashboardvalue>(
      this.url + 'getcountstudent',
      requestOptions
    );
  }

  profilechange(data: any): Observable<any> {
    const userType = 'student';
    const headers = new HttpHeaders().set('userType', userType);
    const requestOptions = { headers: headers };
    return this.http.put<any>(this.url + 'profilechange', data, requestOptions);
  }
  getprofile(): Observable<profile> {
    const userType = 'student';
    const headers = new HttpHeaders().set('userType', userType);
    const requestOptions = { headers: headers };
    return this.http.get<profile>(this.url + 'getprofile', requestOptions);
  }
  studentforgetpass(data: any): Observable<any> {
    const userType = 'student';
    const headers = new HttpHeaders().set('userType', userType);
    const requestOptions = { headers: headers };
    return this.http.put<any>(this.url + 'forgetpass', data, requestOptions);
  }
}
