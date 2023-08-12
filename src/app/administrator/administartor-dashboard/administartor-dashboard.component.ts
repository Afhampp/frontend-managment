import { Component ,OnInit} from '@angular/core';
import {Chart,registerables} from 'node_modules/chart.js'
import { AdministratorServiceService } from 'src/app/service/administrator-service.service';
Chart.register(...registerables)

@Component({
  selector: 'app-administartor-dashboard',
  templateUrl: './administartor-dashboard.component.html',
  styleUrls: ['./administartor-dashboard.component.css']
})
export class AdministartorDashboardComponent  implements OnInit{

  class!:number
  student!:number
  teacher!:number
  graphvalue:number[]=[]

  constructor(private adminservice:AdministratorServiceService){}

  ngOnInit(): void {
    this.adminservice.getcount().subscribe((value)=>{
      this.class=value.totalclass
      this.student=value.totalstudent
      this.teacher=value.totalteacher
      this.graphvalue.push(this.class)
      this.graphvalue.push(this.student)
      this.graphvalue.push(this.teacher)
      this.RenderChart()
    })
   
  }

  RenderChart() {
    new Chart("piechart", {
      type: 'doughnut',
      data: {
        labels: ['Class', 'Student', 'Teacher'],
        datasets: [{
          data: this.graphvalue,
          backgroundColor: ['#ff9c00', '#6326c1', '#13b8bc'], // Example colors for the slices
          borderWidth: 1
        }]
      },
    });
  }
}  
