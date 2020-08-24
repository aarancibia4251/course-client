import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { Course } from '../model/course.model';
import { environment } from '../../../environments/environment';
import {catchError, map, tap} from 'rxjs/operators';
import { CourseMapper } from '../mapper/CourseMapper';
import { CourseEntity } from '../model/course-entity.model';
import { CourseDbService } from './course-db.service';
import { resolve } from 'dns';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private courseUrl = environment.apiUrl + 'curso';
  courseMapper = new CourseMapper();
  constructor(
    private httpClient: HttpClient,
    private courseDbService: CourseDbService
  ) {}

  tryToGetAndSaveCourses(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.httpClient
        .get(this.courseUrl, {})
        .subscribe((res: Array<CourseEntity>) => {
          const listCourseDb = this.courseMapper.mapperFromListWsToListDb(
            res
          );
          this.courseDbService
            .getAndSaveFromRest(listCourseDb)
            .then((x) => resolve(true))
            .catch((e) => resolve(false));
        }, e => {
          console.log(e.error);
          reject(e);
        });
    });
  }

  getCourses(): Promise<Array<Course>> {
    return new Promise<Array<Course>>((resolve, reject) => {
      this.courseDbService.getAllCoursesFromDb()
        .then(docs => resolve(docs))
        .catch(e => reject(e));
    });
  }

  saveCourse(course: Course): Observable<CourseEntity> {
    return null;
  }
}
