import { Injectable } from '@angular/core';
import {NzMessageService} from "ng-zorro-antd";
import {InfoMessageComponent} from "../info-message/info-message.component";

@Injectable({
  providedIn: 'root'
})
export class SuccessService {

  constructor(
    private nzMessageService: NzMessageService
  ) { }

  showBasicSuccess(title: string, message: string) {

  }
}
