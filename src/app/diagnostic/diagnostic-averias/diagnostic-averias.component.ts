import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-diagnostic-averias',
  templateUrl: './diagnostic-averias.component.html',
  styleUrls: ['./diagnostic-averias.component.scss']
})
export class DiagnosticAveriasComponent implements OnInit {
  @Input('titulo') titulo: string;
  @Input('data-step') dataStep: any;
  constructor() { }

  ngOnInit(): void {
  }

}
