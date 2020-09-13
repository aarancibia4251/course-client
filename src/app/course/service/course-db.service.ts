import { Injectable } from '@angular/core';
import { PouchDbService } from './pouch-db.service';
import { CourseDb } from '../model/course-db.model';
import { SuccessPouch } from '../model/success-pouch';
import { CourseMapper } from '../mapper/CourseMapper';
import { Course } from '../model/course.model';
import { Constants } from 'src/app/utils/Constants';

@Injectable({
  providedIn: 'root',
})
export class CourseDbService {
  courseMapper = new CourseMapper();
  constructor(private pouchDbService: PouchDbService) {}

  getAndSaveFromRest(
    listCourseDb: Array<CourseDb>
  ): Promise<Array<SuccessPouch>> {
    return new Promise<Array<SuccessPouch>>((resolve, reject) => {
      const promiseCourses = [];
      for (const courseDb of listCourseDb) {
        promiseCourses.push(this.pouchDbService.put(courseDb._id, courseDb));
      }
      Promise.all(promiseCourses)
        .then((success) => resolve(success))
        .catch((e) => reject(e));
    });
  }

  getCourseFromDb(courseId: string): Promise<Course> {
    return new Promise<Course>((resolve, reject) => {
      this.pouchDbService
        .get(courseId)
        .then((doc) => {
          const course = this.courseMapper.mapperFromDbToModel(doc);
          resolve(course);
        })
        .catch((e) => reject(e));
    });
  }

  getAllCoursesFromDb(): Promise<Array<Course>> {
    return new Promise<Array<Course>>((resolve, reject) => {
      this.pouchDbService
        .getDocumentsByEntity(Constants.ENTITIES.COURSE_ENTITY)
        .then(
          (docs) => {
            const listCourses = this.courseMapper.mapperFromListDbToListModel(docs);
            resolve(listCourses);
          },
          (e) => reject(e)
        );
    });
  }

  saveCourse(courseDb: CourseDb): Promise<SuccessPouch> {
    return new Promise<SuccessPouch>((async (resolve, reject) => {
      try {
        const succesSaved = await this.pouchDbService.put(courseDb._id, courseDb);
        resolve(succesSaved);
      } catch (e) {
        reject(e);
      }
    }));
  }

  deleteCourse(courseDb: CourseDb): Promise<boolean> {
    return new Promise<boolean>((async (resolve, reject) => {
      try {
        await this.pouchDbService.remove(courseDb);
        resolve(true);
      } catch (e) {
        reject(e);
      }
    }));
  }
}
