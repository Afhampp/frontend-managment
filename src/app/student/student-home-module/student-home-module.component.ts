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

  

  singout(){
    sessionStorage.removeItem('student')
    this.route.navigate(['/'])
  }
  
}
