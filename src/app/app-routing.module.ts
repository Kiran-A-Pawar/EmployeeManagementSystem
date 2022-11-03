import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { ListViewComponent } from './employees/list-view/list-view.component';
import { RegistrationOfEmployeesComponent } from './employees/registration-of-employees/registration-of-employees.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'employeesList', component: EmployeesComponent },
  { path: 'RegistrationOfEmployees', component: RegistrationOfEmployeesComponent },
  { path: 'list-view', component: ListViewComponent },
  { path: 'login', component: LoginComponent },
  { path: 'error-page', component: ErrorPageComponent },
  {path: '**', component: ListViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
