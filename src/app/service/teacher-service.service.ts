import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherServiceService {


  constructor(private http:HttpClient) { }
   url='http://localhost:3000/teacher/'

  teacherlogin(data:any):Observable<any>{
    return this.http.post<any>(this.url+"login",data)
  }
  getclasses():Observable<any>{
    const item = sessionStorage.getItem('teacher');
    const token = item ? JSON.parse(item).token : null; 
  
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const requestOptions = { headers: headers };
    return this.http.get<any>(this.url+"getclasses",requestOptions)
  }
  getstudentfromclass(id:any):Observable<any>{
    return this.http.get<any>(this.url+'getstuentfromclass/'+id)
  }
}
