import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-app',
  templateUrl: './update-app.component.html',
  styleUrls: ['./update-app.component.scss']
})
export class UpdateAppComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  chargeSw() {
    window.location.reload();
  }

}
