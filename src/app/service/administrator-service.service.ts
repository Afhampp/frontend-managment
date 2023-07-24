import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { logindata }from '../administrator/logininterface'

@Injectable({
  providedIn: 'root'
})
export class AdministratorServiceService {

  constructor(private http:HttpClient) { }
   url='http://localhost:3000/admin/'

  adminlogin(data:logindata):Observable<any>{
    return this.http.post<logindata>(this.url+'login',data)
  }

  teacheraddd(data:any):Observable<any>{
    return this.http.post<any>(this.url+'addteacher',data)
  }
  getteacher():Observable<any>{
    const item = sessionStorage.getItem('admin');
    const token = item ? JSON.parse(item).token : null; 
  
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const requestOptions = { headers: headers };
    return this.http.get<any>(this.url+'getteacher',requestOptions)
  }
  updateteacher(data:any,id:any):Observable<any>{
    return this.http.put<any>(this.url+'updatedata/'+id,data)
  }
  deleteteacher(id:any):Observable<any>{
    return this.http.delete<any>(this.url+'deletedata/'+id)
  }
  subjectadd(data:any):Observable<any>{
    return this.http.post<any>(this.url+'subjectadd',data)
  }
  getsubject():Observable<any>{
    return this.http.get<any>(this.url+'getsubject')
  }
  updatesubejct(data:any,id:any):Observable<any>{
    return this.http.put<any>(this.url+'updatesubject/'+id,data)
  }
  deletesubject(id:any):Observable<any>{
    return this.http.delete<any>(this.url+'deletesubject/'+id)
  }
  getstudent():Observable<any>{
    return this.http.get<any>(this.url+'getstudent')
  }
  updatestudent(data:any,id:any):Observable<any>{
    return this.http.put<any>(this.url+'updatestudent/'+id,data)
  }
  deletestudent(id:any):Observable<any>{
    return this.http.delete<any>(this.url+'deletestudent/'+id)
  }
  addstudent(data:any):Observable<any>{
    return this.http.post<any>(this.url+'addstudent',data)
  }
  addclass(data:any):Observable<any>{
    return this.http.post<any>(this.url+'addclass',data)
  }
  getclass():Observable<any>{
    return this.http.get<any>(this.url+'getclass')
  }
  updateclass(data:any,id:any):Observable<any>{
    return this.http.put<any>(this.url+'updateclass/'+id,data)
  }
  deleteclass(id:any):Observable<any>{
    return this.http.delete<any>(this.url+'deleteclass/'+id)
  }
  getclassid(id:any):Observable<any>{
    return this.http.get<any>(this.url+'getclass/'+id)
  }
  addteacherinclass(data:any,id:any):Observable<any>{
    return this.http.post<any>(this.url+'teachertoclass/'+id,data)
  }
  deleteteacherfromclass(data:any,id:any):Observable<any>{
    return this.http.put<any>(this.url+'removeteacher/'+id,data)
  }
  getclassstudentid(id:any):Observable<any>{
    return this.http.get<any>(this.url+'getclassstudent/'+id)
  }
  addstudentinclass(data:any,id:any):Observable<any>{
    return this.http.post<any>(this.url+'studenttoclass/'+id,data)
  }
  removestudent(data:any,id:any):Observable<any>{
    return this.http.put<any>(this.url+'removestudent/'+id,data)
  }
}
