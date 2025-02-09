import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private endpoint = 'students';

  constructor(private apiService: ApiService) {}

  // Obtener lista de estudiantes (con token)
  getStudents(): Observable<any> {
    return this.apiService.get<any>(this.endpoint, true);
  }

  // Crear un nuevo estudiante (con token)
  createStudent(studentData: any): Observable<any> {
    return this.apiService.post<any>(this.endpoint, studentData, true);
  }

  updateStudent(studentId: number, studentData: any): Observable<any> {
    return this.apiService.put<any>('students', studentId, studentData, true);
  }
  
  getStudentById(studentId: number): Observable<any> {
    return this.apiService.getById<any>('students/degree', studentId, true);
  }
  
}
