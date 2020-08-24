import { Component, OnInit } from '@angular/core';
import { Course } from '../../model/course.model';
import { CourseBuilder } from '../../model/course.model.builder';
import { ActivatedRoute } from '@angular/router';
import { CourseDbService } from '../../service/course-db.service';
import { CoursePresenter } from './course.presenter';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss'],
})
export class CreateCourseComponent implements OnInit {
  courseId: string;
  course: Course;
  coursePresenter: CoursePresenter = new CoursePresenter(new FormBuilder());
  constructor(
    private activatedRoute: ActivatedRoute,
    private courseDbService: CourseDbService,
  ) {
    this.activatedRoute.params.subscribe(({ id }) => (this.courseId = id));
    if (this.courseId) {
      this.getDataFromCourse().finally();
    } else {
    }
  }

  ngOnInit(): void {}

  getDataFromCourse(): Promise<Course> {
    return new Promise<Course>((resolve, reject) => {
      this.courseDbService
        .getCourseFromDb(this.courseId)
        .then((model) => {
          this.course = model;
          this.coursePresenter.assignDataToForm(this.course);
          resolve(model);
        })
        .catch((e) => reject(e));
    });
  }

  saveCourse() {
    console.log(this.coursePresenter.getDataFromForm());
  }

  changeDateCalendar(changedDate) {
    console.log(changedDate);
  }

  private createCourseModel(): Course {
    return new CourseBuilder()
      .setCourseId('ASVA')
      .setCourseName('Matematca')
      .setCoursePrice(15)
      .setCourseTeacher('Alexis Arancibia')
      .create();
  }
}
