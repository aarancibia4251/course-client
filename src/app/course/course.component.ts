import { Component, OnInit } from '@angular/core';
import { Course } from './model/course.model';
import { CourseBuilder } from './model/course.model.builder';
import { CourseService } from './service/course.service';
import { from, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { CourseDbService } from './service/course-db.service';
import { DateHelper } from '../utils/DateHelper';
import {CoursePresenter} from './components/create-course/course.presenter';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  listCourse: Array<Course> = [];
  listCourseObs$: Observable<Array<Course>> = new Observable<Array<Course>>();
  constructor(
    private courseService: CourseService,
    private router: Router,
    private courseDbService: CourseDbService,
  ) {}

  ngOnInit(): void {
    this.tryTogetAndSaveCourse();
  }

  tryTogetAndSaveCourse() {
    this.courseService
      .tryToGetAndSaveCourses()
      .then(
        async (value) => {
          // show snackbar sincronizado
          console.log('SDFSDFSDFDSFSD', value);
        },
        (e) => {
          // show navbar no sincronizado
          console.log('error');
        }
      )
      .finally(() => {
        this.listCourseObs$ = from(this.courseDbService.getAllCoursesFromDb());
      });
  }

  goToEditCourse(course: Course) {
    this.router.navigate(['course/editar/', course.courseId]);
  }
}
