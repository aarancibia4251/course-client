import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { DateHelper } from 'src/app/utils/DateHelper';
import {Course} from '../../model/course.model';

export class CoursePresenter {
  public courseFormGroup: FormGroup;
  public courseName: FormControl;
  public coursePrice: FormControl;
  public courseTeacher: FormControl;
  public courseRegister: FormControl;

  constructor(private fb: FormBuilder) {
    this.courseFormGroup = this.createCourseForm();
  }

  getDataFromForm() {
    return this.courseFormGroup.getRawValue();
  }

  assignDataToForm(course: Course) {
    this.courseName.setValue(course.courseName);
    this.coursePrice.setValue(course.coursePrice);
    this.courseTeacher.setValue(course.courseTeacher);
    this.courseRegister.setValue(course.courseRegister);
  }

  createCourseForm(): FormGroup {
    this.courseName = new FormControl(null);
    this.coursePrice = new FormControl(null);
    this.courseTeacher = new FormControl(null);
    this.courseRegister = new FormControl(DateHelper.getCurrentDate());
    return this.fb.group({
      courseName: this.courseName,
      coursePrice: this.coursePrice,
      courseTeacher: this.courseTeacher,
      courseRegister: this.courseRegister,
    });
  }
}
