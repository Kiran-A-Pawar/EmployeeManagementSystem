import { Component,AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

import {MatSort} from '@angular/material/sort';
import { EmployeesDataService } from 'src/app/employees-data.service';
import { ToastService } from 'src/app/services/toast.service';
import { MessageService } from 'src/app/services/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['employeeName', 'position', 'about','date'];
  allEmployeesData : any = {};
  searchList = '';
  employeesNotFound = false;
  noRecords = false;
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private empService: EmployeesDataService,
    private toastService: ToastService,
    public ms: MessageService,
    private router: Router,) {}

  ngOnInit(): void {
    this.empService.getEmployees();
    this.allEmployeesData = this.empService.allEmployees;
    this.dataSource = new MatTableDataSource(this.allEmployeesData);
    // console.log("this.allEmployeesData.length",this.allEmployeesData.length)
    // if(this.allEmployeesData.length == 0){
    //   console.log("this.allEmployeesData.length",this.allEmployeesData.length)
    //   this.noRecords = true;
    // }else{
    //   this.noRecords = false;
    // }

    this.ms.subscribe('EMPLOYE_NAME', data => {
      let isObject = typeof data
      if (isObject != 'object') {
        this.searchData(data);
      }
    });
  }  

  searchData(searchValue: any) {
    this.dataSource = new MatTableDataSource(this.allEmployeesData);
        if(searchValue == ''){
      this.employeesNotFound = false;
      this.dataSource = new MatTableDataSource(this.allEmployeesData);
    }else{
      var regex = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
      let specialCharacter = regex.test(searchValue);
      if(specialCharacter == true){
        this.router.navigate(['/', 'error-page']);
      }
      let eName = searchValue;
      let eNameLowerCase = searchValue;
      eName = eName.toUpperCase();
      eNameLowerCase = eNameLowerCase.toLowerCase();
      let empObj =  this.allEmployeesData.filter((t: any) =>t.employeeName.includes(searchValue));
      this.dataSource = new MatTableDataSource(empObj);
      if(this.dataSource.filteredData.length == 0){
        this.employeesNotFound = true;
      }else{
        this.employeesNotFound = false;
      }
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
