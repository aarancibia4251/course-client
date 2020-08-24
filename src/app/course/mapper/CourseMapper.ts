import { AdapterMapper } from './AdapterMapper';
import { CourseDb } from '../model/course-db.model';
import { CourseEntity } from '../model/course-entity.model';
import { Course } from '../model/course.model';
import { CourseBuilder } from '../model/course.model.builder';
import { CourseDbBuilder } from '../model/course-db.builder';
import { Constants } from 'src/app/utils/Constants';
import {DateHelperService} from 'ng-zorro-antd';
import {DateHelper} from '../../utils/DateHelper';

export class CourseMapper
  implements AdapterMapper<Course, CourseDb, CourseEntity> {
  mapperFromWsToModel(item: CourseEntity): Course {
    return new CourseBuilder()
      .setCourseId(item.cursoId)
      .setCourseName(item.cursoNombre)
      .setCoursePrice(item.cursoPrecio)
      .setCourseTeacher(item.cursoProfesor)
      .setCourseCreated(DateHelper.wsStringToDate(item.cursoCreado))
      .setCourseUpdated(DateHelper.wsStringToDate(item.cursoActualizado))
      .create();
  }
  mapperFromListWsToListModel(list: CourseEntity[]): Course[] {
    const mapper = new CourseMapper();
    return list.map((x) => mapper.mapperFromWsToModel(x));
  }
  mapperFromWsToDb(item: CourseEntity): CourseDb {
    return new CourseDbBuilder()
      .setCourseId(item.cursoId)
      .setCourseName(item.cursoNombre)
      .setCoursePrice(item.cursoPrecio)
      .setCourseTeacher(item.cursoProfesor)
      .setCourseCreated(DateHelper.wsStringToDate(item.cursoCreado))
      .setCourseUpdated(DateHelper.wsStringToDate(item.cursoActualizado))
      .setIdEntity(Constants.ENTITIES.COURSE_ENTITY)
      .create();
  }
  mapperFromListWsToListDb(list: CourseEntity[]): CourseDb[] {
    const mapper = new CourseMapper();
    return list.map((x) => mapper.mapperFromWsToDb(x));
  }
  mapperFromModelToDb(item: Course): CourseDb {
    return new CourseDbBuilder()
      .setCourseId(item.courseId)
      .setCourseName(item.courseName)
      .setCoursePrice(item.coursePrice)
      .setCourseTeacher(item.courseTeacher)
      .setCourseCreated(item.courseCreated)
      .setCourseUpdated(item.courseUpdated)
      .setIdEntity(Constants.ENTITIES.COURSE_ENTITY)
      .setRev(item._rev)
      .create();
  }
  mapperFromDbToModel(item: CourseDb): Course {
    return new CourseBuilder()
      .setCourseId(item._id)
      .setCourseName(item.courseName)
      .setCoursePrice(item.coursePrice)
      .setCourseTeacher(item.courseTeacher)
      .setCourseCreated(item.courseCreated)
      .setCourseUpdated(item.courseUpdated)
      .setIdEntity(item.idEntity)
      .setRev(item._rev)
      .create();
  }
  mapperFromModelToWs(item: Course): CourseEntity {
    throw new Error('Method not implemented.');
  }
  mapperFromListModelToListDb(list: Course[]): CourseDb[] {
    throw new Error('Method not implemented.');
  }
  mapperFromListDbToListModel(list: CourseDb[]): Course[] {
    const mapper = new CourseMapper();
    return list.map(x => mapper.mapperFromDbToModel(x));
  }
}
