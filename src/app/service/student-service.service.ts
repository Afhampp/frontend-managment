import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {

  constructor(private http:HttpClient) { }
   url='http://localhost:3000/student/'

   studentlogin(data:any):Observable<any>{
    return this.http.post<any>(this.url+"login",data)
  }

  getassignemnt():Observable<any>{

    const userType = 'student'
    const headers = new HttpHeaders().set('userType', userType);
    const requestOptions = { headers: headers };
    return this.http.get<any>(this.url+"getassigment",requestOptions)
  }
  assigemntsubmittion(data:any,id:any):Observable<any>{
    const userType = 'student'
    const headers = new HttpHeaders().set('userType', userType);
    const requestOptions = { headers: headers };
    return this.http.put<any>(this.url+'assigmentsubmittion/'+id,data,requestOptions)
  }
  getstudentid():Observable<any>{
    const userType = 'student'
    const headers = new HttpHeaders().set('userType', userType);
    const requestOptions = { headers: headers };
    return this.http.get<any>(this.url+"getstudentid",requestOptions)
  }

  getnotes():Observable<any>{
    const userType = 'student'
    const headers = new HttpHeaders().set('userType', userType);
    const requestOptions = { headers: headers };
    return this.http.get<any>(this.url+"getnotes",requestOptions)
  }

  getattendacedata():Observable<any>{
    const userType = 'student'
    const headers = new HttpHeaders().set('userType', userType);
    const requestOptions = { headers: headers };
    return this.http.get<any>(this.url+"getattendace",requestOptions)
  }
  getclass():Observable<any>{
    const userType = 'student'
    const headers = new HttpHeaders().set('userType', userType);
    const requestOptions = { headers: headers };
    return this.http.get<any>(this.url+"getclass",requestOptions)
  }
}
