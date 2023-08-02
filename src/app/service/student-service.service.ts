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
    const item = sessionStorage.getItem('student');
    const token = item ? JSON.parse(item).token : null; 
  
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const requestOptions = { headers: headers };
    return this.http.get<any>(this.url+"getassigment",requestOptions)
  }
  assigemntsubmittion(data:any,id:any):Observable<any>{
    const item = sessionStorage.getItem('student');
    const token = item ? JSON.parse(item).token : null; 
  
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const requestOptions = { headers: headers };
    return this.http.put<any>(this.url+'assigmentsubmittion/'+id,data,requestOptions)
  }
  getstudentid():Observable<any>{
    const item = sessionStorage.getItem('student');
    const token = item ? JSON.parse(item).token : null; 
  
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const requestOptions = { headers: headers };
    return this.http.get<any>(this.url+"getstudentid",requestOptions)
  }

  getnotes():Observable<any>{
    const item = sessionStorage.getItem('student');
    const token = item ? JSON.parse(item).token : null; 
  
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const requestOptions = { headers: headers };
    return this.http.get<any>(this.url+"getnotes",requestOptions)
  }
}
