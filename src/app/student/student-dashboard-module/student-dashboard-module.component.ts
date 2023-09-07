import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'node_modules/chart.js';
import { StudentServiceService } from 'src/app/service/student-service.service';
import { Dashboardvalue } from '../StudentInterface/interfaces';
import { Subscription } from 'rxjs';
Chart.register(...registerables);

@Component({
  selector: 'app-student-dashboard-module',
  templateUrl: './student-dashboard-module.component.html',
  styleUrls: ['./student-dashboard-module.component.css'],
})
export class StudentDashboardModuleComponent implements OnInit {
  private studentCountSubcription: Subscription | undefined;

  teacher!: number;
  graphvalue: number[] = [];
  listteacherdata: {
    teacherName: string;
    presentCount: number;
    absentCount: number;
    totalMarks: number;
  }[] = [];
  teacherNames: string[] = [];
  totalMarks: number[] = [];
  presentCount: number[] = [];
  absentCount: number[] = [];
  totalpreset!: number;
  totalabsent!: number;
  percentage!: number;
  piechart: number[] = [];

  constructor(
    private studentservice: StudentServiceService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.studentCountSubcription = this.studentservice
      .getcountstudent()
      .subscribe({
        next: (value: Dashboardvalue) => {
          this.teacher = value.teachercount;

          this.listteacherdata = value.teacherData;
          this.teacherNames = this.listteacherdata.map(
            (item) => item.teacherName
          );
          this.totalMarks = this.listteacherdata.map((item) => item.totalMarks);
          this.presentCount = this.listteacherdata.map(
            (item) => item.presentCount
          );
          this.absentCount = this.listteacherdata.map(
            (item) => item.absentCount
          );
          this.totalpreset = this.presentCount.reduce((total, value) => {
            return total + value;
          }, 0);
          this.totalabsent = this.absentCount.reduce((total, value) => {
            return total + value;
          }, 0);
          const percent = Number(
            (this.totalpreset / (this.totalabsent + this.totalpreset)) * 100
          );
          this.percentage = Number(percent.toFixed(1));
          this.piechart.push(this.totalpreset);
          this.piechart.push(this.totalabsent);
          this.graphvalue.push(this.teacher);
          this.RenderChart();
        },
        error: (error: any) => {},
      });
  }

  RenderChart() {
    new Chart('piechart', {
      type: 'bar',
      data: {
        labels: this.teacherNames,
        datasets: [
          {
            label: 'mark',
            data: this.totalMarks,
            backgroundColor: ['#03d8e8'],
            borderWidth: 1,
            barThickness: 20,
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
                size: 7, // Adjust the font size
              },
            },
          },
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });

    new Chart('barchart', {
      type: 'bar',
      data: {
        labels: this.teacherNames,
        datasets: [
          {
            label: 'Present Count',
            data: this.presentCount,
            backgroundColor: '#03d8e8',
            borderWidth: 1,
          },
          {
            label: 'Absent Count',
            data: this.absentCount,
            backgroundColor: '#A6D9DD',
            borderWidth: 1,
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
                size: 7, // Adjust the font size
              },
            },
          },
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
        elements: {
          bar: {
            borderWidth: 1,
          },
        },
      },
    });

    new Chart('chart', {
      type: 'doughnut',
      data: {
        labels: ['total present', 'total absent'],
        datasets: [
          {
            data: this.piechart,
            backgroundColor: ['#03d8e8', '#A6D9DD'],
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
  }

  ngOnDestroy() {
    this.studentCountSubcription?.unsubscribe();
  }
}
