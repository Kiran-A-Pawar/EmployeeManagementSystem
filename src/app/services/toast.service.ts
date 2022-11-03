import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ToastComponent } from '../toast/toast.component';
//import { ToastComponent } from '../utils/toast/toast.component';
@Injectable({
  providedIn: 'root'
})
export class ToastService {
  
  constructor(private snackBar:MatSnackBar) {}
  
  openSnackBar(message: string, snackType?: string) {
    this.snackBar.openFromComponent(ToastComponent  , {
       duration: 2500,
       verticalPosition: 'top',
       horizontalPosition: 'right',
       panelClass: ['toaster'],
       data: {message: message, snackType: snackType}
    });
  }
}
