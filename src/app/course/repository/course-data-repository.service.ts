import { Injectable } from '@angular/core';
import {SuccessPouch} from "../model/success-pouch";
import {CourseDbService} from "../service/course-db.service";
import {CourseService} from "../service/course.service";
import {Course} from "../model/course.model";
import {CourseMapper} from "../mapper/CourseMapper";

@Injectable({
  providedIn: 'root'
})
export class CourseDataRepositoryService {
  courseMapper = new CourseMapper();
  constructor(
    private courseDbSrv: CourseDbService,
    private courseRestSrv: CourseService,
  ) { }

  updateCourse(course: Course): Promise<SuccessPouch> {
    return new Promise<SuccessPouch>((async (resolve, reject) => {
      try {
        const courseDbToSave = this.courseMapper.mapperFromModelToDb(course);
        const lastCourseDb = await this.courseDbSrv.getCourseFromDb(courseDbToSave._id);
        await this.courseDbSrv.saveCourse(courseDbToSave);
        this.courseRestSrv.saveCourse(course)
          .then(success => {
            resolve(new SuccessPouch(courseDbToSave._id, courseDbToSave._rev, true, 'Curso Actualizado'));
          })
          .catch(async e => {
            if (lastCourseDb) {
              this.courseDbSrv.saveCourse(this.courseMapper.mapperFromModelToDb(lastCourseDb));
            }
            reject(e);
          });
      } catch (e) {
        reject(e);
      }
    }));
  }

  saveCourse(course: Course): Promise<SuccessPouch> {
    return new Promise<SuccessPouch>((async (resolve, reject) => {
      try {
        const courseDbToSave = this.courseMapper.mapperFromModelToDb(course);
        await this.courseDbSrv.saveCourse(courseDbToSave);
        this.courseRestSrv.saveCourse(course)
          .then(success => {
            resolve(new SuccessPouch(courseDbToSave._id, courseDbToSave._rev, true, 'Curso Creado'));
          })
          .catch(e => {
            this.courseDbSrv.deleteCourse(courseDbToSave);
            reject(e);
          });
      } catch (e) {
        reject(e);
      }
    }));
  }
}
