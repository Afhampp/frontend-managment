import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {Chart,registerables} from 'node_modules/chart.js'
import { StudentServiceService } from 'src/app/service/student-service.service';
import Swal from 'sweetalert2';
Chart.register(...registerables)

@Component({
  selector: 'app-student-dashboard-module',
  templateUrl: './student-dashboard-module.component.html',
  styleUrls: ['./student-dashboard-module.component.css']
})
export class StudentDashboardModuleComponent implements OnInit{



  teacher!:number
  graphvalue:number[]=[]
  listteacherdata: { teacherName: string,presentCount:number,absentCount:number, totalMarks: number }[] =[]
  teacherNames:string[]=[]
  totalMarks:number[]=[]
  presentCount:number[]=[]
  absentCount:number[]=[]
  totalpreset!:number
  totalabsent!:number
  percentage!:number
  piechart:number[]=[]

  constructor(private studentservice:StudentServiceService,private route:Router){}

  ngOnInit(): void {
    this.studentservice.getcountstudent().subscribe({
      next:(value:any)=>{

 
      this.teacher=value.teachercount
   
        this.listteacherdata=value.teacherData
         this.teacherNames = this.listteacherdata.map(item => item.teacherName);
        this.totalMarks = this.listteacherdata.map(item => item.totalMarks);
        this.presentCount = this.listteacherdata.map(item => item.presentCount);
        this.absentCount = this.listteacherdata.map(item => item.absentCount);
        this.totalpreset=this.presentCount.reduce((total,value)=>{
          return total+value
        },0)
        this.totalabsent=this.absentCount.reduce((total,value)=>{
          return total+value
        },0)
        const percent=Number(((this.totalpreset)/(this.totalabsent+this.totalpreset))*100)
        this.percentage = Number(percent.toFixed(1))
       this.piechart.push(this.totalpreset)
       this.piechart.push(this.totalabsent)
      this.graphvalue.push(this.teacher)
      this.RenderChart()
    },
    error:(error:any)=>{
   
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
              sessionStorage.removeItem('student')
              this.route.navigate(['/'])
          }
        });
      }
  }
})
   
  }

  RenderChart() {
   
    new Chart("piechart", {
      type: 'bar',
      data: {
        labels: this.teacherNames,
        datasets: [{
          label: 'mark',
          data: this.totalMarks,
          backgroundColor: ['#ba54f5'],
          borderWidth: 1,
          barThickness: 20
        }]
      },
      options: {
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              font: {
                size: 7 // Adjust the font size
              }
            }
          },
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
    
    new Chart("barchart", {
      type: 'bar',
      data: {
        labels:this.teacherNames,
        datasets: [{
          label: 'Present Count',
          data: this.presentCount,
          backgroundColor: '#ba54f5',
          borderWidth: 1
        },
        {
          label: 'Absent Count',
          data: this.absentCount,
          backgroundColor: '#e14eca',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              font: {
                size: 7 // Adjust the font size
              }
            }
          },
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            display: false
          }
        },
        elements: {
          bar: {
            borderWidth: 1,
            
          }
        }
      }
    });

    new Chart("chart", {
      type: 'doughnut',
      data: {
        labels:["total present","total absent"],
        datasets: [{
          data: this.piechart,
          backgroundColor: ['#ba54f5','#e14eca'],
          borderWidth: 1
        }
        ]
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


