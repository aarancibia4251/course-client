import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { Course } from '../model/course.model';
import { environment } from '../../../environments/environment';
import {catchError, map, tap} from 'rxjs/operators';
import { CourseMapper } from '../mapper/CourseMapper';
import { CourseEntity } from '../model/course-entity.model';
import { CourseDbService } from './course-db.service';
import { resolve } from 'dns';
import {bodyCourseToSave} from "../dto/course-dto.interface";
import {SuccessPouch} from "../model/success-pouch";
import {DateHelper} from "../../utils/DateHelper";
import {StorageService} from "./storage.service";
import {Constants} from "../../utils/Constants";

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private courseUrl = environment.apiUrl + 'api/course';
  courseMapper = new CourseMapper();
  constructor(
    private httpClient: HttpClient,
    private courseDbService: CourseDbService,
    private storageSrv: StorageService,
  ) {}

  async tryToGetAndSaveCourses(): Promise<boolean> {
    const dateSync = await this.storageSrv.getItem(Constants.SYNC);
    let params = new HttpParams();
    if (dateSync) {
      params = params.append('dateSync', dateSync);
    }
    return new Promise<boolean>((resolve, reject) => {
      this.httpClient
        .get(this.courseUrl, { params })
        .subscribe((res: Array<CourseEntity>) => {
          const listCourseDb = this.courseMapper.mapperFromListWsToListDb(res);
          this.courseDbService
            .getAndSaveFromRest(listCourseDb)
            .then((x) => {
              this.storageSrv.setItem(Constants.SYNC, DateHelper.getCurrentDate());
              resolve(true);
            })
            .catch((e) => resolve(false));
        }, e => {
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

  saveCourse(course: Course): Promise<CourseEntity> {
    return new Promise<CourseEntity>(((resolve, reject) => {
      const courseToSave: bodyCourseToSave = {
        Id: course.courseId,
        Nombre: course.courseName,
        Precio: course.coursePrice,
        FechaCreacion: DateHelper.getDateToStringISO(course.courseCreated),
        FechaModificacion: DateHelper.getDateToStringISO(course.courseUpdated),
        FechaRegistro: DateHelper.getDateToStringISO(course.courseRegister)
      };
      this.httpClient.post(this.courseUrl, courseToSave)
        .subscribe((courseSaved: CourseEntity) => resolve(courseSaved), error => reject(error));
    }));
  }
}
