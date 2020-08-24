import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiagnosticAveriasComponent } from './diagnostic-averias/diagnostic-averias.component';
import { DiagnosticOptionsComponent } from './diagnostic-options/diagnostic-options.component';
import {RouterModule, Routes} from '@angular/router';
import { DiagnosticButtonsComponent } from './diagnostic-buttons/diagnostic-buttons.component';

const routes: Routes = [
  {
    path: '',
    component: DiagnosticOptionsComponent
  }
];

@NgModule({
  declarations: [DiagnosticAveriasComponent, DiagnosticOptionsComponent, DiagnosticButtonsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class DiagnosticModule { }
