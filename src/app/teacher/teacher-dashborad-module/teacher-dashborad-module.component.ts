import { Component,OnInit} from '@angular/core';
import { TeacherServiceService } from 'src/app/service/teacher-service.service';
import {Chart,registerables} from 'node_modules/chart.js'
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
Chart.register(...registerables)




@Component({
  selector: 'app-teacher-dashborad-module',
  templateUrl: './teacher-dashborad-module.component.html',
  styleUrls: ['./teacher-dashborad-module.component.css']
})
export class TeacherDashboradModuleComponent implements OnInit{
  student!:number
  class!:number
  classname:string[]=[]
  attendace:number[]=[]
  data:number[]=[]
  totalattendace!:number
  
  constructor(private teacherservice:TeacherServiceService,private route:Router){}
ngOnInit(): void {
  this.teacherservice.getcount().subscribe({
    next:(value)=>{
   
    this.student=value.totalStudents
    this.class=value.totalClasses
    this.classname = value.classAttendance.map((value: any) => {
      return value.className; 
    });
    
    this.attendace=value.classAttendance.map((value:any)=>{
      return value.attendanceCount
    })
    this.totalattendace=this.attendace.reduce((total,val)=>{
      return total+val
    },0)
    this.data.push(this.student)
    this.data.push(this.class)
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
            sessionStorage.removeItem('teacher')
            this.route.navigate(['/teacher'])
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
      labels: ['Class', 'Student'],
      datasets: [{
        data: this.data,
        backgroundColor: ['#ff9c00', '#6326c1'], // Example colors for the slices
        borderWidth: 1
      }]
    },
  }),
  new Chart("barchart", {
    type: 'bar',
    data: {
      labels: this.classname,
      datasets: [{
        data: this.attendace,
        backgroundColor: ['#ff9c00'], // Example colors for the slices
        borderWidth: 1,
        barPercentage: 0.1
      }]
    },
    options: {
      scales: {
        x: {
          grid: {
            display: false // Hide x-axis grid lines
          }
        },
        y: {
          beginAtZero: false // Start y-axis from zero
        }
      },
      plugins: {
        legend: {
          display: false // Hide the legend
        }
      }
    }
  });
}

}
