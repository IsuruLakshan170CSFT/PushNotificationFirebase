import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-notification-popup',
  templateUrl: './notification-popup.component.html',
  styleUrls: ['./notification-popup.component.scss']
})
export class NotificationPopupComponent implements OnInit {
  constructor(private messageService: MessageService, private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Message Content'});
}
}
