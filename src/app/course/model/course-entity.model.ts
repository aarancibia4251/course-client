export class CourseEntity {
  Id: string;
  Nombre: string;
  Precio: number;
  Profesor: string;
  FechaRegistro: string;
  FechaCreacion: string;
  FechaModificacion: string;

  constructor(cursoId: string, cursoNombre: string, cursoPrecio: number, cursoProfesor: string, cursoRegistro: string, cursoCreado: string, cursoActualizado: string) {
    this.Id = cursoId;
    this.Nombre = cursoNombre;
    this.Precio = cursoPrecio;
    this.Profesor = cursoProfesor;
    this.FechaRegistro = cursoRegistro;
    this.FechaCreacion = cursoCreado;
    this.FechaModificacion = cursoActualizado;
  }
}
