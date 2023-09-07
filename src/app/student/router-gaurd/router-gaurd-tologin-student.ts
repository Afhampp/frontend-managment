import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class studentfromlogin implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const teacherData = sessionStorage.getItem('student');
    if (teacherData) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
