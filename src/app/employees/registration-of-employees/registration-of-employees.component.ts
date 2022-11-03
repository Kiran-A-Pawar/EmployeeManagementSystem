import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeesDataService } from 'src/app/employees-data.service';
import { MessageService } from 'src/app/services/message.service';
import { ToastService } from 'src/app/services/toast.service';

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

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  };

  constructor(private fb: FormBuilder, 
    private empService: EmployeesDataService,
    public ms: MessageService,
    private toastService: ToastService,
    ) {}

  ngOnInit(): void {
    this.createRegistrationForm();
    this.empService.updateEmployeeObject;
    this.ms.subscribe('EDIT_EMPLOYEE_DATA', data => {
      console.log("Data&&&",data);
      this.oldEmployeeData = data.empDetails;
      this.editEmployeeData = true;
      this.updateEmp = data;
        this.registrationForm.reset({
        employeeName: data.empDetails.employeeName,
        position: data.empDetails.position,
        about: data.empDetails.about,
        date: data.empDetails.date,
       });
    });
  }  

  createRegistrationForm(){
    this.registrationForm = this.fb.group({
      employeeName : new FormControl(null,[Validators.required]),
      position : new FormControl(null,[Validators.required]),
      about : new FormControl(null,[Validators.required]),
      date : new FormControl(null,[Validators.required])
    })
  }

  onSubmit(){
    if(!this.registrationForm.valid){
      return
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
  }

  updateEmployee(oldEmp : any, newEmp : any){  
    let emps = JSON.parse(localStorage.getItem('Employees')!);
      for(let i = 0; i <emps.length; i++) {
        if(emps[i].employeeName == oldEmp.employeeName) {
         emps[i] = newEmp;
         this.toastService.openSnackBar('Employee Details Updated Sucessfully');  
        }
      }      
    localStorage.setItem('Employees', JSON.stringify(emps));
  }


}
