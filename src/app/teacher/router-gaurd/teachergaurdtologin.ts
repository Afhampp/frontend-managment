import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TeacherAuthGuardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const teacherData = sessionStorage.getItem('teacher');
    if (teacherData) {
      return true;
    } else {
      this.router.navigate(['/teacher']);
      return false;
    }
  }
}
