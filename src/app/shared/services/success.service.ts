import {inject, Injectable} from '@angular/core';
import { NzNotificationService} from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root'
})
export class SuccessService {
  private nzMNotificationSrv: NzNotificationService = inject(NzNotificationService);
  constructor() { }

  showBasicSuccess(title: string, message: string) {
    this.nzMNotificationSrv.success(
      title,
      message
    );
  }
}
