import { Component, OnInit } from '@angular/core';
import { TeacherServiceService } from 'src/app/service/teacher-service.service';
import { Chart, registerables } from 'node_modules/chart.js';
import { dashboardvalue, classattendace } from '../interface/interface_teacher';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
Chart.register(...registerables);

@Component({
  selector: 'app-teacher-dashborad-module',
  templateUrl: './teacher-dashborad-module.component.html',
  styleUrls: ['./teacher-dashborad-module.component.css'],
})
export class TeacherDashboradModuleComponent implements OnInit {
  private TeacherCountSubcription: Subscription | undefined;
  student!: number;
  class!: number;
  classname: string[] = [];
  attendace: number[] = [];
  data: number[] = [];
  totalattendace!: number;

  constructor(
    private teacherservice: TeacherServiceService,
    private route: Router
  ) {}
  ngOnInit(): void {
    this.TeacherCountSubcription = this.teacherservice.getcount().subscribe({
      next: (value: dashboardvalue) => {
        this.student = value.totalStudents;
        this.class = value.totalClasses;

        this.classname = value.classAttendance.map(
          (item: classattendace) => item.className
        );
        this.attendace = value.classAttendance.map(
          (item: classattendace) => item.attendanceCount
        );

        this.totalattendace = this.attendace.reduce((total, val) => {
          return total + val;
        }, 0);
        this.data.push(this.student);
        this.data.push(this.class);
        this.RenderChart();
      },
    });
  }

  RenderChart() {
    new Chart('piechart', {
      type: 'doughnut',
      data: {
        labels: ['Class', 'Student'],
        datasets: [
          {
            data: this.data,
            backgroundColor: ['#B8CDCF', '#2AB9C8'],
            borderWidth: 1,
          },
        ],
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
          },
        },
      },
    });

    new Chart('barchart', {
      type: 'bar',
      data: {
        labels: this.classname,
        datasets: [
          {
            data: this.attendace,
            backgroundColor: ['#2AB9C8'],
            borderWidth: 1,
            barPercentage: 0.12,
          },
        ],
      },
      options: {
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              font: {
                size: 10, // Adjust the font size
              },
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              display: false,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }
  ngOnDestroy() {
    this.TeacherCountSubcription?.unsubscribe();
  }
}
