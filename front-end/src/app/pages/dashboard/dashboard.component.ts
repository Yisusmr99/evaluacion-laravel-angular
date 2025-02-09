import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { ClientSideRowModelModule, GridApi, GridReadyEvent, ModuleRegistry, QuickFilterModule } from 'ag-grid-community';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { DegreeService } from '../../services/degree.service';
import { NotificationService } from '../../services/notification.service';

declare var bootstrap: any;

ModuleRegistry.registerModules([ClientSideRowModelModule, QuickFilterModule]);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule, AgGridModule, NavbarComponent, FormsModule]
})
export class DashboardComponent implements OnInit {
  private gridApi!: GridApi;
  students: any[] = [];
  student: any = {};
  isEditMode: boolean = false;
  private modalInstance: any;
  degrees: any[] = [];

  columnDefs = [
    { headerName: 'Nombre', field: 'studentName', sortable: true, filter: true },
    { headerName: 'Fecha de Nacimiento', field: 'birthdate', sortable: true, filter: true },
    { headerName: 'Grado', field: 'degree.nameDegree', sortable: true, filter: true },
    { headerName: 'Sección', field: 'section', sortable: true, filter: true },
    { headerName: 'Fecha de Ingreso', field: 'dateEntry', sortable: true, filter: true },
    {
      headerName: 'Acciones',
      field: 'actions',
      cellRenderer: (params: any) => this.editButtonRenderer(params),
      width: 100
    }
  ];
  
  defaultColDef = {
    flex: 1,
    minWidth: 150,
    resizable: true
  };

  constructor(
    private studentService: StudentService, 
    private cdr: ChangeDetectorRef, 
    private degreService: DegreeService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.loadStudents();
    this.loadDegrees();
  }

  loadStudents() {
    this.studentService.getStudents().subscribe({
      next: (response) => {
        if (response.result) {
          this.students = response.data;
        }
      },
      error: (err) => {
        console.error('Error al obtener estudiantes:', err);
      }
    });
  }

  loadDegrees() {
    this.degreService.getDegrees().subscribe({
      next: (response) => {
        if (response.result) {
          this.degrees = response.data;
        }
      },
      error: (err) => {
        console.error('Error al obtener grados:', err);
      }
    });
  }

  openModal() {
    const modalElement = document.getElementById('studentModal');
    if (modalElement) {
      this.modalInstance = new bootstrap.Modal(modalElement);
      this.modalInstance.show();
    }
  }

  closeModal() {
    if (this.modalInstance) {
      this.modalInstance.hide();
      this.student = { studentName: '', birthdate: '', degree: { id: '', nameDegree: '' }, section: '', dateEntry: '', fatherName: '', motherName: '' };
    }
  }

  createStudent() {
    this.student = { studentName: '', birthdate: '', degree: { id: '', nameDegree: '' }, section: '', dateEntry: '', fatherName: '', motherName: '' };
    this.isEditMode = false;
    this.cdr.detectChanges();
    this.openModal();
  }

  editStudent(student: any) {
    this.student = { ...student };
    this.student.degree = this.degrees.find(d => d.id === this.student.idDegree) || null;
    this.isEditMode = true;
    this.cdr.detectChanges();
    this.openModal();
  }

  getDegreeName(idDegree: number): string {
    const degree = this.degrees.find(d => d.id === idDegree);
    return degree ? degree.nameDegree : '';
  }

  saveStudent() {
    const studentData = {
      studentName: this.student.studentName,
      birthdate: this.student.birthdate,
      fatherName: this.student.fatherName || '',
      motherName: this.student.motherName || '',
      idDegree: this.student.degree?.id || null,
      section: this.student.section,
      dateEntry: this.student.dateEntry
    };

    if (!studentData.studentName || !studentData.birthdate || !studentData.idDegree || !studentData.section || !studentData.dateEntry) {
      this.notificationService.showError("Todos los campos son requeridos");
      return;
    }
  
    if (this.isEditMode) {
      this.studentService.updateStudent(Number(this.student.id), studentData).subscribe({
        next: () => {
          this.loadStudents();
          this.closeModal();
          this.notificationService.showSuccess("Estudiante actualizado correctamente");
        },
        error: (err) => {
          this.notificationService.showError("Error al actualizar: " + err.error.error)
        }
      });
    } else {
      this.studentService.createStudent(studentData).subscribe({
        next: () => {
          this.loadStudents();
          this.closeModal();
          this.notificationService.showSuccess("Estudiante creado correctamente");
        },
        error: (err) => this.notificationService.showError("Error al crear: " + err.error.error)
      });
    }
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  onFilterTextBoxChanged(event: any) {
    if (this.gridApi) {
      this.gridApi.setGridOption(
        'quickFilterText',
        event.target.value
      );
    }
  }

  editButtonRenderer(params: any) {
    const button = document.createElement('button');
    button.innerText = '✏️ Editar';
    button.classList.add('btn', 'btn-sm', 'btn-warning');
    button.addEventListener('click', () => this.editStudent(params.data));
    return button;
  }

  onFilterDegreeChanged(event: any) {
    if(event.target.value === '0') {
      this.loadStudents();
      return
    }
    this.studentService.getStudentById(event.target.value).subscribe({
      next: (response) => {
        if (response.result) {
          this.students = response.data;
        }
      },
      error: (err) => {
        console.error('Error al obtener grados:', err);
      }
    });
  }
}