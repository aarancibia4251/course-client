import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-diagnostic-buttons',
  templateUrl: './diagnostic-buttons.component.html',
  styleUrls: ['./diagnostic-buttons.component.scss']
})
export class DiagnosticButtonsComponent implements OnInit {

  @Input() buttonsNeeded: number[];
  @Output() buttonsEvent: EventEmitter<Array<number>> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {

  }

  showButtonOneAndFive() {
    this.buttonsEvent.emit([1, 5]);
  }

  canShow(value: number): boolean {
    return this.buttonsNeeded.filter(x => x === value).length > 0;
  }

}
