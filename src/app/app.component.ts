import { Component } from '@angular/core';
import {PouchDbService} from './course/service/pouch-db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'appsteps';
  constructor(
    private pouchDbService: PouchDbService,
  ) {
  }
}
