import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DropFileComponent } from './drop-file/drop-file.component';

const routes: Routes = [
  {
    path: 'app',
    component: AppComponent,
  },
  {
    path: '',
    redirectTo: 'course',
    pathMatch: 'full',
  },
  {
    path: 'course',
    loadChildren: () =>
      import('./course/course.module').then((m) => m.CourseModule),
  },
  {
    path: 'drop',
    component: DropFileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
