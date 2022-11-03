import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  public snackBarRef!: MatSnackBarRef<ToastComponent>;
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    console.log(data); 
  }

  ngOnInit() {}

  getIcon() {
    switch (this.data.snackType) {
      case 'Success':
        return 'fa fa-check-circle';
      case 'Error':
        return 'fa fa-times-circle-o';
      case 'Warn':
        return 'warning';
      case 'Info':
        return 'info';
      default:
        return 'fa fa-check-circle';
    }
  }

}
