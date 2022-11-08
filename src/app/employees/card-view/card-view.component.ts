import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeesDataService } from 'src/app/employees-data.service';
import { MessageService } from 'src/app/services/message.service';
import { ToastService } from 'src/app/services/toast.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.scss']
})
export class CardViewComponent implements OnInit {
  allEmployeesData : any = {};
  deleteEmployeesData : any = {};
  employeeName = "";
  position = "";
  description = "";
  empId = 0;

  constructor(private empService: EmployeesDataService, 
    private router: Router,
    public ms: MessageService,
    private toastService: ToastService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.empService.getEmployees();
    this.allEmployeesData = this.empService.allEmployees;
  }

  updateEmployee(empDetails:any,id:any){
    console.log("empDetails",empDetails);
    this.empService.editEmployeeDetails = true;
    let data = {empDetails,id}
    this.empService.updateEmployeeObject = empDetails;
    this.ms.publish('EDIT_EMPLOYEE_DATA_AFTER_LOGIN', this.empService.editEmployeeDetails);
    this.ms.publish('EDIT_EMPLOYEE_DATA', data);
    if(this.empService.isLogin == true){
      this.router.navigate(['/', 'RegistrationOfEmployees']);
    }else{
      this.router.navigate(['/', 'login']);
    }
  }

  deleteEmployeeData(){
    this.deleteEmployee(this.deleteEmployeesData,this.empId)
  }

  openPopup(content: any, employee:any, id:any) {
    this.empId = id;
    this.deleteEmployeesData = employee;
    this.modalService.open(content, { centered: true, windowClass: 'shortcut-modal', size: 'small' });
  }

  deleteEmployee(employee:any,id:any){
    let result = this.empService.allEmployees.splice(id, 1);
    localStorage.setItem('Employees',JSON.stringify(this.empService.allEmployees));
    this.toastService.openSnackBar('Employee Details Deleted Sucessfully');
  }
}