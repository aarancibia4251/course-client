import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diagnostic-options',
  templateUrl: './diagnostic-options.component.html',
  styleUrls: ['./diagnostic-options.component.scss']
})
export class DiagnosticOptionsComponent implements OnInit {

  buttonsList: Array<number> = [];

  constructor() { }

  ngOnInit(): void {
    this.buttonsList.push(3, 4);
  }

  getButtonsToShow(buttons: Array<number>): void {
    this.buttonsList = buttons;
  }

}
