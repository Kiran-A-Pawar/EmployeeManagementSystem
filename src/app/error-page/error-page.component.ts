import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {

  constructor(public ms: MessageService,private router: Router) { }

  ngOnInit(): void {
  }

}
