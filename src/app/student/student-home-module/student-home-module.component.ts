import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-student-home-module',
  templateUrl: './student-home-module.component.html',
  styleUrls: ['./student-home-module.component.css']
})
export class StudentHomeModuleComponent implements OnInit{

  constructor(private route:Router){
    if(!sessionStorage.getItem('student')){
      this.route.navigate(['/'])
    }
  }
  ngOnInit(): void {
   
  }

  singout(){
    sessionStorage.removeItem('teacher')
    this.route.navigate(['/'])
  }
}
