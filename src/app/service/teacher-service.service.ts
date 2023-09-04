import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherServiceService {


  constructor(private http:HttpClient) { }
  private url='https://www.backendcollage.online/teacher/'

  teacherlogin(data:any):Observable<any>{
    return this.http.post<any>(this.url+"login",data)
  }
  getclasses():Observable<any>{
    const userType = 'teacher'
    const headers = new HttpHeaders().set('userType', userType);
    const requestOptions = { headers: headers };
    return this.http.get<any>(this.url+"getclasses",requestOptions)
  }
  getstudentfromclass(id:any):Observable<any>{
    return this.http.get<any>(this.url+'getstuentfromclass/'+id)
  }
  assigmentquestion(data:any):Observable<any>{
 
    const userType = 'teacher'
    const headers = new HttpHeaders().set('userType', userType);
    const requestOptions = { headers: headers };
    return this.http.post<any>(this.url+"assigemntquestion",data,requestOptions)
  }
  showassigment():Observable<any>{
    const userType = 'teacher'
    const headers = new HttpHeaders().set('userType', userType);
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
    const userType = 'teacher'
    const headers = new HttpHeaders().set('userType', userType);
    const requestOptions = { headers: headers };
    return this.http.get<any>(this.url+'getteacherid',requestOptions)
  }

  shownotes():Observable<any>{
    const userType = 'teacher'
    const headers = new HttpHeaders().set('userType', userType);
    const requestOptions = { headers: headers };
    return this.http.get<any>(this.url+"shownotes",requestOptions)
  }

  notessubmittion(data:any):Observable<any>{
    const userType = 'teacher'
    const headers = new HttpHeaders().set('userType', userType);
    const requestOptions = { headers: headers };
    return this.http.post<any>(this.url+"notesubmittion",data,requestOptions)
  }

  upadatenotes(data:any,id:any):Observable<any>{
    return this.http.put<any>(this.url+'updatenotes/'+id,data)
  }
  deletenotes(id:any):Observable<any>{
    return this.http.delete<any>(this.url+'deletenotes/'+id)
  }

  getattendacedata(id:any):Observable<any>{
    const userType = 'teacher'
    const headers = new HttpHeaders().set('userType', userType);
    const requestOptions = { headers: headers };
    return this.http.get<any>(this.url+'getattendancedata/'+id,requestOptions)
  }
  addattendace(data:any):Observable<any>{

    return this.http.put<any>(this.url+'addattendace',data)
  }
  getattendace(rowDataid: any, studentId: string): Observable<any> {
    const userType = 'teacher';
    const headers = new HttpHeaders().set('userType', userType);
    const requestOptions = { headers: headers };
  
  
    return this.http.get<any>(`${this.url}getattedancedate/${rowDataid}?studentId=${studentId}`, requestOptions);
  }
  updateattendace(data:any):Observable<any>{

    return this.http.put<any>(this.url+'updateattendace',data)
  }

  updatemark(data:any):Observable<any>{

    const userType = 'teacher';
    const headers = new HttpHeaders().set('userType', userType);
    const requestOptions = { headers: headers };
    return this.http.put<any>(this.url+'updatemark',data,requestOptions)
  }

  getcount(): Observable<any> {
    const userType = 'teacher';
    const headers = new HttpHeaders().set('userType', userType);
    const requestOptions = { headers: headers };
  
    // Include both parameters in the URL
    return this.http.get<any>(`${this.url}getcount`, requestOptions);
  }
}
