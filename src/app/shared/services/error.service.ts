import { Injectable } from '@angular/core';
import {NzNotificationService} from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(
    private nzMNotificationSrv: NzNotificationService
  ) { }

  showBasicError(title: string, message: string) {
    this.nzMNotificationSrv.error(
      title,
      message
    );
  }
}
