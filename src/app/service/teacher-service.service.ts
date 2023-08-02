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
  assigmentquestion(data:any):Observable<any>{
    const item = sessionStorage.getItem('teacher');
    const token = item ? JSON.parse(item).token : null; 
  
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const requestOptions = { headers: headers };
    return this.http.post<any>(this.url+"assigemntquestion",data,requestOptions)
  }
  showassigment():Observable<any>{
    const item = sessionStorage.getItem('teacher');
    const token = item ? JSON.parse(item).token : null; 
  
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const requestOptions = { headers: headers };
    return this.http.get<any>(this.url+"showassigment",requestOptions)
  }

  getbaseurl(fileName: any, options: any): Observable<any> {
    return this.http.get<any>(this.url + 'getbaseurl/' + fileName, options);
  }

  updateassigment(data:any,id:any):Observable<any>{
    return this.http.put<any>(this.url+'updateassignment/'+id,data)
  }
  deleteassigment(id:any):Observable<any>{
    return this.http.delete<any>(this.url+'assigmentdelete/'+id)
  }

  getassigmentsubmitted(id:any):Observable<any>{
    return this.http.get<any>(this.url+'getassigmentsubmitted/'+id)
  }
  getteacherid():Observable<any>{
    const item = sessionStorage.getItem('teacher');
    const token = item ? JSON.parse(item).token : null; 
  
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const requestOptions = { headers: headers };
    return this.http.get<any>(this.url+'getteacherid',requestOptions)
  }

  shownotes():Observable<any>{
    const item = sessionStorage.getItem('teacher');
    const token = item ? JSON.parse(item).token : null; 
  
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const requestOptions = { headers: headers };
    return this.http.get<any>(this.url+"shownotes",requestOptions)
  }

  notessubmittion(data:any):Observable<any>{
    const item = sessionStorage.getItem('teacher');
    const token = item ? JSON.parse(item).token : null; 
  
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const requestOptions = { headers: headers };
    return this.http.post<any>(this.url+"notesubmittion",data,requestOptions)
  }

  upadatenotes(data:any,id:any):Observable<any>{
    return this.http.put<any>(this.url+'updatenotes/'+id,data)
  }
  deletenotes(id:any):Observable<any>{
    return this.http.delete<any>(this.url+'deletenotes/'+id)
  }
}
