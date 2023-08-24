import { Component,ViewChild ,OnInit} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatDialog, } from '@angular/material/dialog';
import { AdministratorServiceService } from 'src/app/service/administrator-service.service';
import { NgConfirmService } from 'ng-confirm-box';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-teacher-shedule-module',
  templateUrl: './teacher-shedule-module.component.html',
  styleUrls: ['./teacher-shedule-module.component.css']
})
export class TeacherSheduleModuleComponent implements OnInit {

  rowDataid: string | null = null;
  addteacher!:boolean
  displayedColumns: string[] = ['day','9-11','11:30-1:30',"2:30-4:00","4:00-6:00"];
  dataSource!: MatTableDataSource<any>;


  constructor(private activeroute: ActivatedRoute,private dialog:MatDialog,private adminservice:AdministratorServiceService,private ngconfirm:NgConfirmService,private route:Router) {}

  ngOnInit(): void {
    const id = this.activeroute.snapshot.paramMap.get('id');
    this.rowDataid = id;
    this.getschedule()
  }


 

  

 

 

  getschedule() {
    this.adminservice.getclassschedule(this.rowDataid).subscribe({
      next:(value) => {
      const flattenedData: any[] = value.getdata.reduce((acc: any[], curr: any[]) => {
        return acc.concat(curr);
      }, []);
      console.log(flattenedData);
      this.dataSource = new MatTableDataSource(flattenedData);
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
});
  }
  



}


