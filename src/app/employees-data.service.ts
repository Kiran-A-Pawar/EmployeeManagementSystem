import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeesDataService {
  allEmployees : any = {};
  expandMenu = false;
  editEmployeeDetails = false;
  userName = '';
  password ='';
  isLogin = false;
  isLogout = null;
  userLogin = false;
  updateEmployeeObject : any = {};

  constructor() { }

  addEmployee(employeeObj: any){
    let employees = [];
    if(localStorage.getItem('Employees')){
      employees = JSON.parse(localStorage.getItem('Employees')!);
      employees = [employeeObj, ...employees]
    }else{
      employees.push(employeeObj)
    }
    localStorage.setItem('Employees',JSON.stringify(employees));
    this.allEmployees = employees;
  }

  getEmployees(){
    this.allEmployees = JSON.parse(localStorage.getItem('Employees')!);
  }
}
