import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseComponent } from './course.component';
import { Routes, RouterModule } from '@angular/router';
import { CreateCourseComponent } from './components/create-course/create-course.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ReactiveFormsModule } from '@angular/forms';

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
  imports: [CommonModule, RouterModule.forChild(routes), NgZorroAntdModule, ReactiveFormsModule],
})
export class CourseModule {}
