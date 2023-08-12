import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
    providedIn: 'root'
  })
  export class TeacherLoginGuard implements CanActivate {
  
    constructor(private router: Router) { }
  
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      console.log('canActivate called:', state.url);
      console.log(route.url)
      console.log(state.root.url)
    
      const teacherData = sessionStorage.getItem('teacher');
      if (teacherData) {
        console.log("User is logged in, redirecting back to the current page");
        
        // Redirect the user back to the same page they were trying to access
        this.router.navigate(['/teacher/home'])
        
        return false; // Prevent navigation (not used in this case)
      } else {
        console.log("User is not logged in, allow access to login page");
        return true; // Allow navigation
      }
    }
  }
  
