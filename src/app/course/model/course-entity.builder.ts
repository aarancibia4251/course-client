import {CourseEntity} from './course-entity.model';

export class CourseEntityBuilder {
  private _cursoId: string;
  private _cursoNombre: string;
  private _cursoPrecio: number;
  private _cursoProfesor: string;
  private _cursoCreado: string;
  private _cursoActualizado: string;

  setCursoId(value: string): CourseEntityBuilder {
    this._cursoId = value;
    return this;
  }

  setCursoNombre(value: string): CourseEntityBuilder {
    this._cursoNombre = value;
    return this;
  }

  setCursoPrecio(value: number): CourseEntityBuilder {
    this._cursoPrecio = value;
    return this;
  }

  setCursoProfesor(value: string): CourseEntityBuilder {
    this._cursoProfesor = value;
    return this;
  }

  setCursoCreado(value: string): CourseEntityBuilder {
    this._cursoCreado = value;
    return this;
  }

  setCursoActualizado(value: string): CourseEntityBuilder {
    this._cursoActualizado = value;
    return this;
  }

  create(): CourseEntity {
    return new CourseEntity(
      this._cursoId,
      this._cursoNombre,
      this._cursoPrecio,
      this._cursoProfesor,
      this._cursoCreado,
      this._cursoActualizado,
    );
  }
}
