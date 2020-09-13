import { Component, OnInit } from '@angular/core';
import { Course } from '../../model/course.model';
import { CourseBuilder } from '../../model/course.model.builder';
import {ActivatedRoute, Router} from '@angular/router';
import { CourseDbService } from '../../service/course-db.service';
import { CoursePresenter } from './course.presenter';
import { FormBuilder } from '@angular/forms';
import {DateHelper} from "../../../utils/DateHelper";
import {Guid} from "guid-typescript";
import {Constants} from "../../../utils/Constants";
import { CourseDataRepositoryService } from '../../repository/course-data-repository.service';
import {ErrorService} from "../../../shared/services/error.service";
import {SuccessService} from "../../../shared/services/success.service";

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
    private router: Router,
    private courseDbService: CourseDbService,
    private courseRepository: CourseDataRepositoryService,
    private errorSrv: ErrorService,
    private successSrv: SuccessService,
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

  async saveCourse() {
    if (this.coursePresenter.courseFormGroup.invalid) {
      return;
    }
    try {
      if (this.courseId) {
        await this.courseRepository.updateCourse(this.createCourseModel());
      } else {
        const course = this.createCourseModel();
        await this.courseRepository.saveCourse(course);
        this.courseId = course.courseId;
      }
      this.successSrv.showBasicSuccess('Course', 'Se registraron los datos');
    } catch (e) {
      this.errorSrv.showBasicError('Course', 'No se pudo guardar los datos');
    }
  }

  changeDateCalendar(changedDate) {
    console.log(changedDate);
  }

  private createCourseModel(): Course {
    const course: Course = this.coursePresenter.getDataFromForm();
    const currentTime = DateHelper.getCurrentDate();
    course.courseRegister.setHours(currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds(), 0);
    return new CourseBuilder()
      .setCourseId(this.courseId ? this.courseId : Guid.create().toString())
      .setCourseName(course.courseName)
      .setCoursePrice(course.coursePrice)
      .setCourseRegister(course.courseRegister)
      .setCourseUpdated(DateHelper.getCurrentDate())
      .setIdEntity(Constants.ENTITIES.COURSE_ENTITY)
      .create();
  }
}
