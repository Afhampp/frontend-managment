import { Component,ViewChild ,OnInit} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatDialog, } from '@angular/material/dialog';
import { AdministratorServiceService } from 'src/app/service/administrator-service.service';
import { NgConfirmService } from 'ng-confirm-box';
import { ActivatedRoute, Router } from '@angular/router';
import { AdministratorAddSchedulingComponent } from '../administrator-add-scheduling/administrator-add-scheduling.component';

@Component({
  selector: 'app-administrator-scheduling',
  templateUrl: './administrator-scheduling.component.html',
  styleUrls: ['./administrator-scheduling.component.css']
})
export class AdministratorSchedulingComponent implements OnInit {

  rowDataid: string | null = null;
  addteacher!:boolean
  displayedColumns: string[] = ['day','9-11','11:30-1:30',"2:30-4:00","4:00-6:00",'action'];
  dataSource!: MatTableDataSource<any>;


  constructor(private activeroute: ActivatedRoute,private dialog:MatDialog,private adminservice:AdministratorServiceService,private ngconfirm:NgConfirmService,private route:Router) {}

  ngOnInit(): void {
    const id = this.activeroute.snapshot.paramMap.get('id');
    this.rowDataid = id;
    this.getschedule()
  }


 

  back(){
    this.route.navigate(['/administrator/adminhome/adminclass'])
  }
  

 

 

  getschedule() {
    this.adminservice.getclassschedule(this.rowDataid).subscribe((value) => {
      const flattenedData: any[] = value.getdata.reduce((acc: any[], curr: any[]) => {
        return acc.concat(curr);
      }, []);
      console.log(flattenedData);
      this.dataSource = new MatTableDataSource(flattenedData);
    });
  }
  



  deletevalue(row:any){
    const rowdataid=this.rowDataid
    row.rowdataid=rowdataid
    this.dialog.open(AdministratorAddSchedulingComponent,{
      width:'80%',
      data:row
    }).afterClosed().subscribe((val)=>{
      if(val=="updated"){
        this.getschedule()
      }
    })
  }
}
