import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeesDataService } from '../employees-data.service';
import { MessageService } from '../services/message.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchInput = '';
  empForm! : FormGroup;


  constructor(private router: Router,
    public empService: EmployeesDataService,
    public ms: MessageService,
    private toastService: ToastService,
    private fb: FormBuilder,) {}

  ngOnInit(): void {
    this.empForm = this.fb.group({
      eName : new FormControl(null),
    })
    this.empForm.get('eName')?.valueChanges.subscribe(
      employeeName=>{
        console.log("EMPLOYE NAME",employeeName)
        this.ms.publish('EMPLOYE_NAME', employeeName);
      }
    )
  }

  expandMenuOption(){
    this.empService.expandMenu = !this.empService.expandMenu;
  }

  goToEmployeesIndex(){
    this.empService.expandMenu = false;
    this.router.navigate(['/', 'employeesList']);
  }

  goToLoginPage(){
    this.empService.expandMenu = false;
    this.router.navigate(['/', 'login']);
  }

  logOut(){
    let data = "";
    this.empService.isLogin = false;
    this.toastService.openSnackBar('User Logout Sucessfully');
    this.ms.publish('USER_LOGOUT', data);
  }

}
