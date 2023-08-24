import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
    providedIn: 'root'
  })
  export class TeacherLoginGuard implements CanActivate {
  
    constructor(private router: Router) { }
  
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      
    
      const teacherData = sessionStorage.getItem('teacher');
      if (teacherData) {
       
        
        this.router.navigate(['/teacher/home'])
        
        return false; 
      } else {
   
        return true; 
      }
    }
  }
  
