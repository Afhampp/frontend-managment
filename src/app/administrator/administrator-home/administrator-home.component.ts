import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administrator-home',
  templateUrl: './administrator-home.component.html',
  styleUrls: ['./administrator-home.component.css'],
})
export class AdministratorHomeComponent implements OnInit {
  constructor(private route: Router) {
  
  }
  ngOnInit(): void {}

  singout() {
    sessionStorage.removeItem('admin');
    this.route.navigate(['/administrator']);
  }
}
