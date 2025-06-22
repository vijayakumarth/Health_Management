import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-patient',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.css']
})
export class RegisterPatientComponent {
  showModal = false;
  message = '';
  patients: any[] = [];

  // Patient form object
  patient = {
    name: '',
    age: null,
    gender: '',
    contact: '',
    symptoms: ''
  };

  editId: string | null = null; // <-- track edit state

  isEditMode: boolean = false;


  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getPatients();
  }

  // Submit for both Add and Edit
  onSubmit() {
    if (this.editId) {
      // Edit mode
      this.http.put(`http://localhost:5000/api/patients/${this.editId}`, this.patient).subscribe({
        next: () => {
          this.message = '✏️ Patient updated successfully!';
          this.resetForm();
          this.getPatients();
          this.isEditMode= false;
        },
        error: (err) => {
          this.message = '❌ Update failed: ' + (err.error?.error || err.message);
        }
      });
    } else {
      // Register new patient
      this.http.post('http://localhost:5000/api/patients', this.patient).subscribe({
        next: () => {
          this.message = '✅ Patient registered successfully!';
          this.resetForm();
          this.getPatients();
        },
        error: (err) => {
          this.message = '❌ Registration failed: ' + (err.error?.error || err.message);
        }
      });
    }
  }

  // Get all patients
  getPatients() {
    this.http.get<any[]>('http://localhost:5000/api/patients').subscribe(data => {
      this.patients = data;
      
    });
  }

  // Fill form to edit
  editPatient(p: any) {
    this.patient = { ...p }; // pre-fill form
    this.editId = p._id;
    this.isEditMode= true;
  }

  // Cancel edit
  resetForm() {
    this.patient = { name: '', age: null, gender: '', contact: '', symptoms: '' };
    this.editId = null;
    this.message = '';
  }

  // Optional: delete
  deletePatient(id: string) {
    if (confirm('Are you sure you want to delete this patient?')) {
      this.http.delete(`http://localhost:5000/api/patients/${id}`).subscribe({
        next: () => {
          this.message = '🗑️ Patient deleted successfully!';
          this.getPatients();
        },
        error: (err) => {
          this.message = '❌ Delete failed: ' + (err.error?.error || err.message);
        }
      });
    }
  }

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 8;

  get totalPages(): number {
    return Math.ceil(this.patients.length / this.itemsPerPage);
  }

  getPaginatedPatients() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.patients.slice(start, start + this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
}
