import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class administratorfromlogin implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const teacherData = sessionStorage.getItem('admin');
    if (teacherData) {
      return true;
    } else {
      this.router.navigate(['/administrator']);
      return false;
    }
  }
}
