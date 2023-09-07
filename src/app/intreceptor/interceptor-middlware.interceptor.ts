import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router'; 
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class InterceptorMiddlwareInterceptor implements HttpInterceptor {
  constructor( private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const userType = req.headers.get('userType');
    const item = userType ? sessionStorage.getItem(userType) : '';
    const token = item ? JSON.parse(item).token : null;

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          const errorResponse = error.error;

          if (errorResponse.type === 'admin') {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Your session has expired. You will be redirected to the login page.',
              showCancelButton: false,
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK',
            }).then((result) => {
              if (result.isConfirmed) {
                sessionStorage.removeItem('admin');
                this.router.navigate(['/administrator']);
              }
            });
          } else if (errorResponse.type === 'teacher') {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Your session has expired. You will be redirected to the login page.',
              showCancelButton: false,
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK',
            }).then((result) => {
              if (result.isConfirmed) {
                sessionStorage.removeItem('teacher');
                this.router.navigate(['/teacher']);
              }
            });
          } else if (errorResponse.type === 'student') {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Your session has expired. You will be redirected to the login page.',
              showCancelButton: false,
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK',
            }).then((result) => {
              if (result.isConfirmed) {
                sessionStorage.removeItem('student');
                this.router.navigate(['/']);
              }
            });
          }
        }

        return throwError(error);
      })
    );
  }
}
