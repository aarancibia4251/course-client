import { Injectable } from '@angular/core';
import { NzNotificationService} from "ng-zorro-antd";

@Injectable({
  providedIn: 'root'
})
export class SuccessService {

  constructor(
    private nzMNotificationSrv: NzNotificationService
  ) { }

  showBasicSuccess(title: string, message: string) {
    this.nzMNotificationSrv.success(
      title,
      message
    );
  }
}
