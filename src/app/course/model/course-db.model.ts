export class CourseDb {
  _id: string;
  courseName: string;
  coursePrice: number;
  courseTeacher: string;
  courseRegister: Date;
  courseCreated: Date;
  courseUpdated: Date;
  _rev: string;
  idEntity: string;

  constructor(
    _id: string,
    courseName: string,
    coursePrice: number,
    courseTeacher: string,
    courseRegister: Date,
    courseCreated: Date,
    courseUpdated: Date,
    _rev: string,
    idEntity: string
  ) {
    this._id = _id;
    this.courseName = courseName;
    this.coursePrice = coursePrice;
    this.courseTeacher = courseTeacher;
    this.courseRegister = courseRegister;
    this.courseCreated = courseCreated;
    this.courseUpdated = courseUpdated;
    this._rev = _rev;
    this.idEntity = idEntity;
  }
}
