export class CourseEntity {
  cursoId: string;
  cursoNombre: string;
  cursoPrecio: number;
  cursoProfesor: string;
  cursoCreado: string;
  cursoActualizado: string;

  constructor(cursoId: string, cursoNombre: string, cursoPrecio: number, cursoProfesor: string, cursoCreado: string, cursoActualizado: string) {
    this.cursoId = cursoId;
    this.cursoNombre = cursoNombre;
    this.cursoPrecio = cursoPrecio;
    this.cursoProfesor = cursoProfesor;
    this.cursoCreado = cursoCreado;
    this.cursoActualizado = cursoActualizado;
  }
}
