import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
    providedIn: 'root'
  })
  export class administratortologin implements CanActivate {
  
    constructor(private router: Router) { }
  
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      
    
      const teacherData = sessionStorage.getItem('admin');
      if (teacherData) {
       
        
        this.router.navigate(['/administrator'])
        
        return false; 
      } else {
   
        return true; 
      }
    }
  }
  
