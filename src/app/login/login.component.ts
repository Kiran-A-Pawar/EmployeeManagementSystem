import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeesDataService } from '../employees-data.service';
import { MessageService } from '../services/message.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm! : FormGroup;
  hide = true;
  invalidUser = false;
  invalidPassword = false;
  invalidData = false;
  editEmployeeData = false;

  constructor(private router: Router,
    public ms: MessageService, 
    public empService: EmployeesDataService,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.ms.subscribe('EDIT_EMPLOYEE_DATA_AFTER_LOGIN', data => {
      this.editEmployeeData = data;
    });

    this.ms.subscribe('USER_LOGOUT', data => {
      this.editEmployeeData = data;
      this.userLogOut();
    });
    
    this.loginForm = new FormGroup({
      user : new FormControl('',[Validators.required]),
      password : new FormControl('',[Validators.required,Validators.minLength(5)])
    })
  }

  onLogin(){
    if(!this.loginForm.valid){
      return
    }

    if(this.loginForm.value.user != "admin" && this.loginForm.value.password != "admin"){
      this.invalidData = true;
      this.empService.isLogin = false;
    }else{
      this.invalidData = false;
      this.empService.isLogin = false;
      if(this.loginForm.value.user != "admin"){
        this.invalidUser = true;
      }else{
        this.invalidUser = false;
      }
      if(this.loginForm.value.password != "admin"){
        this.invalidPassword = true;
      }else{
        this.invalidPassword = false;
      }
    }

    if(this.loginForm.value.user == "admin" && this.loginForm.value.password == "admin" && this.editEmployeeData == true){
      this.router.navigate(['/', 'RegistrationOfEmployees']);
    }else{
      if(this.loginForm.value.user == "admin" && this.loginForm.value.password == "admin"){
        this.empService.isLogin = true;
        this.toastService.openSnackBar('Login Sucessfully');
        this.router.navigate(['/', 'list-view']);
      }
    }
  }

  userLogOut(){
    this.loginForm.value.user = null;
    this.loginForm.value.password = null;
  }
}
