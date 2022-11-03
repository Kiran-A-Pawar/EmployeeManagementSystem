import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeesDataService } from '../employees-data.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  cardViewData = false;
  listViewData = true;
  newEmployeeData = false;

  constructor(private router: Router, 
    public empService: EmployeesDataService,
    private toastService: ToastService) { }

  ngOnInit(): void {
  }

  newEmployeeRegistration(){
    this.cardViewData = false;
    this.listViewData = false;
    this.newEmployeeData = true;
    //this.router.navigate(['/', 'RegistrationOfEmployees']);
  }

  listView(){
    this.cardViewData = false;
    this.newEmployeeData = false;
    this.listViewData = true;
  }

  cardView(){
    this.newEmployeeData = false;
    this.listViewData = false;
    this.cardViewData = true;
  }
}
