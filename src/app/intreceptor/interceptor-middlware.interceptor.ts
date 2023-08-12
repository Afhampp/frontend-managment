import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, 
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class InterceptorMiddlwareInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
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
        if (error.status === 502) {
          this.toastr.error('Bad Gateway: Please try again later', 'Error');
        }
        else if(error.status==403){
          this.toastr.error("session out")

        }

        // Re-throw the error to propagate it further
        return throwError(error);
      })
    );
   
  }
}
