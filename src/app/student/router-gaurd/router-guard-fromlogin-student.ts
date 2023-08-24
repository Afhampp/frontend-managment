import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
    providedIn: 'root'
  })
  export class studenttologin implements CanActivate {
  
    constructor(private router: Router) { }
  
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      
    
      const teacherData = sessionStorage.getItem('student');
      if (teacherData) {
       
        
        this.router.navigate(['/home'])
        
        return false; 
      } else {
   
        return true; 
      }
    }
  }
  
