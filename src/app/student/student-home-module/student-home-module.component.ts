import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-student-home-module',
  templateUrl: './student-home-module.component.html',
  styleUrls: ['./student-home-module.component.css']
})
export class StudentHomeModuleComponent implements OnInit{


  isSidebarMini = true;

  
  constructor(private route:Router){
    
  }
  ngOnInit(): void {
   
  }

  toggleSidebar() {
    console.log('Toggle sidebar clicked');
    this.isSidebarMini = !this.isSidebarMini;
  }

  singout(){
    sessionStorage.removeItem('student')
    this.route.navigate(['/'])
  }
  isActive(routePath: string): boolean {
    return this.route.isActive(routePath, false);
  }
}
