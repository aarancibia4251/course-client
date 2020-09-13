import { Component } from '@angular/core';
import {PouchDbService} from './course/service/pouch-db.service';
import { Constants } from './utils/Constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'appsteps';
  dateSync = localStorage.getItem(Constants.SYNC);
  constructor(
    private pouchDbService: PouchDbService,
  ) {
  }
}
