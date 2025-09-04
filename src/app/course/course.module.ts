import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseComponent } from './course.component';
import { Routes, RouterModule } from '@angular/router';
import { CreateCourseComponent } from './components/create-course/create-course.component';
import { ReactiveFormsModule } from '@angular/forms';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzListModule} from 'ng-zorro-antd/list';
import {NzButtonModule} from 'ng-zorro-antd/button';

const routes: Routes = [
  {
    path: '',
    component: CourseComponent,
  },
  {
    path: 'crear',
    component: CreateCourseComponent,
  },
  {
    path: 'editar/:id',
    component: CreateCourseComponent,
  },
];

@NgModule({
  declarations: [CourseComponent, CreateCourseComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule, NzGridModule, NzDatePickerModule, NzInputModule, NzFormModule, NzListModule, NzButtonModule],
})
export class CourseModule {}
