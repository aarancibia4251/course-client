import { CourseDb } from './course-db.model';

export class CourseDbBuilder {
  private _courseId: string;
  private _courseName: string;
  private _coursePrice: number;
  private _courseTeacher: string;
  private _courseCreated: Date;
  private _courseUpdated: Date;
  private _rev: string;
  private idEntity: string;

  setCourseId(value: string): CourseDbBuilder {
    this._courseId = value;
    return this;
  }

  setCourseName(value: string): CourseDbBuilder {
    this._courseName = value;
    return this;
  }

  setCoursePrice(value: number): CourseDbBuilder {
    this._coursePrice = value;
    return this;
  }

  setCourseTeacher(value: string): CourseDbBuilder {
    this._courseTeacher = value;
    return this;
  }

  setCourseCreated(value: Date): CourseDbBuilder {
    this._courseCreated = value;
    return this;
  }

  setCourseUpdated(value: Date): CourseDbBuilder {
    this._courseUpdated = value;
    return this;
  }

  setIdEntity(value: string): CourseDbBuilder {
    this.idEntity = value;
    return this;
  }

  setRev(value: string): CourseDbBuilder {
    this._rev = value;
    return this;
  }

  create(): CourseDb {
    return new CourseDb(
      this._courseId,
      this._courseName,
      this._coursePrice,
      this._courseTeacher,
      this._courseCreated,
      this._courseUpdated,
      this._rev,
      this.idEntity
    );
  }
}
