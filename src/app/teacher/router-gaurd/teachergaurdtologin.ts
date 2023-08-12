import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TeacherAuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    const teacherData = sessionStorage.getItem('teacher');
    if (teacherData) {
      // User is logged in, allow access
      return true;
    } else {
      // User is not logged in, navigate to login page
      this.router.navigate(['/teacher']);
      return false;
    }
  }
}

