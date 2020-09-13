import { TestBed } from '@angular/core/testing';

import { CourseDataRepositoryService } from './course-data-repository.service';

describe('CourseDataRepositoryService', () => {
  let service: CourseDataRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseDataRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
