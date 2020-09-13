import { Course } from './course.model';

export class CourseBuilder {
  private _courseId: string;
  private _courseName: string;
  private _coursePrice: number;
  private _courseTeacher: string;
  private _courseRegister: Date;
  private _courseCreated: Date;
  private _courseUpdated: Date;
  private _rev: string;
  private _idEntity: string;

  setCourseId(value: string): CourseBuilder {
    this._courseId = value;
    return this;
  }

  setCourseName(value: string): CourseBuilder {
    this._courseName = value;
    return this;
  }

  setCoursePrice(value: number): CourseBuilder {
    this._coursePrice = value;
    return this;
  }

  setCourseTeacher(value: string): CourseBuilder {
    this._courseTeacher = value;
    return this;
  }

  setCourseRegister(value: Date) {
    this._courseRegister = value;
    return this;
  }

  setCourseCreated(value: Date): CourseBuilder {
    this._courseCreated = value;
    return this;
  }

  setCourseUpdated(value: Date): CourseBuilder {
    this._courseUpdated = value;
    return this;
  }

  setIdEntity(value: string): CourseBuilder {
    this._idEntity = value;
    return this;
  }

  setRev(value: string): CourseBuilder {
    this._rev = value;
    return this;
  }

  create(): Course {
    return new Course(
      this._courseId,
      this._courseName,
      this._coursePrice,
      this._courseTeacher,
      this._courseRegister,
      this._courseCreated,
      this._courseUpdated,
      this._rev,
      this._idEntity,
    );
  }
}
