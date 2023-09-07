import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-home-module',
  templateUrl: './teacher-home-module.component.html',
  styleUrls: ['./teacher-home-module.component.css'],
})
export class TeacherHomeModuleComponent implements OnInit {
  constructor(private route: Router) {}
  ngOnInit(): void {}

  singout() {
    sessionStorage.removeItem('teacher');
    this.route.navigate(['/teacher']);
  }
}
