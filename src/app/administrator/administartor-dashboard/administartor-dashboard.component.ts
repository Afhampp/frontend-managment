import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {Chart,registerables} from 'node_modules/chart.js'
import { AdministratorServiceService } from 'src/app/service/administrator-service.service';
import Swal from 'sweetalert2';
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
  subject!:number
  graphvalue:number[]=[]

  constructor(private adminservice:AdministratorServiceService,private route:Router){}

  ngOnInit(): void {
    this.adminservice.getcount().subscribe({
      next:(value)=>{
        console.log(value)
      this.class=value.totalclass
      this.student=value.totalstudent
      this.teacher=value.totalteacher
      this.subject=value.totalsubject
      this.graphvalue.push(this.class)
      this.graphvalue.push(this.student)
      this.graphvalue.push(this.teacher)
      this.graphvalue.push(this.subject)
      this.RenderChart()
    },
    error:(error)=>{
   
      if (error.error.message === 'session has expired') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Your session has expired. You will be redirected to the login page.',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        }).then((result) => {
        
          if (result.isConfirmed) {
              sessionStorage.removeItem('admin')
              this.route.navigate(['/admin'])
          }
        });
      }
  }
})
   
  }

  RenderChart() {
    new Chart("piechart", {
      type: 'doughnut',
      data: {
        labels: ['Class', 'Student', 'Teacher'],
        datasets: [{
          data: this.graphvalue,
          backgroundColor: ['#ff9c00', '#6326c1', '#13b8bc','#b1b1b1'], // Example colors for the slices
          borderWidth: 1
        }]
      },
      options: {
        cutout: '80%', 
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
        },
        layout: {
          padding: {
            top: 10, 
            bottom: 10, 
          }
        }
      }
    });
  }
}  
