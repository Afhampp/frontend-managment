import { HttpClient } from '@angular/common/http';
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
}
