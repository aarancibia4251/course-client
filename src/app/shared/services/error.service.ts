import {inject, Injectable} from '@angular/core';
import {NzNotificationService} from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private nzMNotificationSrv: NzNotificationService = inject(NzNotificationService);
  constructor() { }

  showBasicError(title: string, message: string) {
    this.nzMNotificationSrv.error(
      title,
      message
    );
  }
}
