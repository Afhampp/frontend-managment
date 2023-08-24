import { Component,ViewChild ,OnInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatDialog, } from '@angular/material/dialog';
import { AdministratorServiceService } from 'src/app/service/administrator-service.service';
import { NgConfirmService } from 'ng-confirm-box';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherAddTableComponent } from '../teacher-add-table/teacher-add-table.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-teacher-view-table',
  templateUrl: './teacher-view-table.component.html',
  styleUrls: ['./teacher-view-table.component.css']
})
export class TeacherViewTableComponent implements OnInit {

  rowDataid: string | null = null;
  addteacher!:boolean
  displayedColumns: string[] = ['name', 'email', 'phone', 'subjects','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private activeroute: ActivatedRoute,private dialog:MatDialog,private adminservice:AdministratorServiceService,private ngconfirm:NgConfirmService,private route:Router) {}

  ngOnInit(): void {
    console.log("hai")
    const id = this.activeroute.snapshot.paramMap.get('id');
    this.rowDataid = id;
    this.getteachervalue()
  }


  openDialog(){
    this.dialog.open(TeacherAddTableComponent,{
      width:'80%',
      data:this.rowDataid
    }).afterClosed().subscribe((val)=>{
      if(val=="save"){
        this.getteachervalue()
      }
    })
  }
  

  back(){
    this.route.navigate(['/administrator/adminhome/adminclass'])
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getteachervalue(){
     this.adminservice.getclassid(this.rowDataid) .subscribe((value)=>{
      console.log(value.teacherData)
      this.dataSource=new MatTableDataSource(value.teacherData)
      this.dataSource.paginator=this.paginator
      this.dataSource.sort=this.sort
    })
  }



  deletevalue(row:any){
    this.ngconfirm.showConfirm('Do you want to delete',
      ()=>{
        this.adminservice.deleteteacherfromclass(row,this.rowDataid).subscribe({
          next:()=>{

          this.getteachervalue()
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
      },
      ()=>{

      }
    )
    
  }
}
