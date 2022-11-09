import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { EmployeesDataService } from 'src/app/employees-data.service';
import { MessageService } from 'src/app/services/message.service';
import { ToastService } from 'src/app/services/toast.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-of-employees',
  templateUrl: './registration-of-employees.component.html',
  styleUrls: ['./registration-of-employees.component.scss']
})
export class RegistrationOfEmployeesComponent implements OnInit {

  registrationForm! : FormGroup;
  hide = true;
  employeeObj : any = {};
  storeEmployeeObj : any = {};
  updateEmp : any = {};
  employeeSubmited = false;
  oldEmployeeData : any = {};
  editEmployeeData = false;
  invalidEmployee = false;
  invalidPosition = false;
  invalidAbout = false;
  invalidDate = false;

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  };

  constructor(private fb: FormBuilder, 
    private empService: EmployeesDataService,
    public ms: MessageService,
    private toastService: ToastService,
    private modalService: NgbModal,
    private router: Router,
    ) {if(this.empService.isAdmin == false){
      this.router.navigate(['/', 'login']);
    }}

  ngOnInit(): void {
    
    if(this.empService.isLogin == false){
      this.empService.addNewEmployee = true;
      this.router.navigate(['/', 'login']);
    }

    this.createRegistrationForm();
    this.empService.updateEmployeeObject;
    console.log("this.empService.updateEmployeeObject",this.empService.updateEmployeeObject)
    this.ms.subscribe('EDIT_EMPLOYEE_DATA', data => {
      console.log("Data = ",data);
      if (Object.entries(data).length != 0 && Object.entries(this.empService.updateEmployeeObject).length != 0) {
        this.editEmployeeData = true;
        this.oldEmployeeData = data.empDetails;
        this.updateEmp = data;
          this.registrationForm.reset({
          employeeName: data.empDetails.employeeName,
          position: data.empDetails.position,
          about: data.empDetails.about,
          date: data.empDetails.date,
         });
      }
    });
  }  

  createRegistrationForm(){
    this.registrationForm = this.fb.group({
      employeeName : '',
      position : '',
      about : '',
      //about : new FormControl(null,[Validators.required]),
      date : ''
    })
  }

  onSubmit(){
    if(!this.registrationForm.valid){
      return
    }
    if(this.registrationForm.value.employeeName.length == 0){
      this.invalidEmployee = true;
      
    }
    if(this.registrationForm.value.position.length == 0){
      this.invalidPosition = true;
    }
    if(this.registrationForm.value.about.length == 0){
      this.invalidAbout = true;
    }
    if(this.registrationForm.value.date.length == 0){
      this.invalidDate = true;
    }
    if(this.invalidDate || this.invalidAbout || this.invalidPosition || this.invalidEmployee){
      return;
    }

    this.employeeSubmited = true;

    if(this.editEmployeeData == true){
      this.employeeObj = Object.assign(this.employeeObj,this.registrationForm.value);
      this.updateEmployee(this.oldEmployeeData,this.employeeObj);
    }else{
      if(this.registrationForm.valid){
        this.employeeObj = Object.assign(this.employeeObj,this.registrationForm.value);
        this.empService.addEmployee(this.employeeObj);
        this.toastService.openSnackBar('Employee Details Added Sucessfully');  
        this.employeeSubmited = true;
      }
    }
     this.registrationForm.reset(); 
  }

  addData(){
    this.invalidEmployee = false;
  }

  addPositionData(){
    this.invalidPosition = false;
  }

  addAboutData(){
    this.invalidAbout = false;
  }

  addDate(){
    this.invalidDate = false;
  }

  updateEmployee(oldEmp : any, newEmp : any){  
    let emps = JSON.parse(localStorage.getItem('Employees')!);
      for(let i = 0; i <emps.length; i++) {
        if(emps[i].employeeName == oldEmp.employeeName) {
         emps[i] = newEmp;
         this.toastService.openSnackBar('Employee Details Updated Sucessfully');  
        }
      }   
      this.registrationForm.reset();
      localStorage.setItem('Employees', JSON.stringify(emps));
      this.editEmployeeData = false;
      this.empService.updateEmployeeObject = {}
       this.router.navigate(['/', 'card-view']);
  }
}
