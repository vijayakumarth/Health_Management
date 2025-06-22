// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [CommonModule, FormsModule, HttpClientModule,RouterModule],
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//    showModal = false;
//   patient = {
//     name: '',
//     age: null,
//     gender: '',
//     contact: '',
//     symptoms: ''
//   };

//   message = '';

//   patients: any[] = [];
 
//   openModal() {
//     this.showModal = true;
//   }

//   closeModal() {
//     this.showModal = false;
//   }
  

//   ngOnInit() {
//     this.getPatients();
//   }


//   constructor(private http: HttpClient) {}

//   onSubmit() {
//     this.http.post('http://localhost:5000/api/patients', this.patient)
//       .subscribe({
//         next: () => {
//           this.message = '✅ Patient registered successfully!';
//           this.patient = { name: '', age: null, gender: '', contact: '', symptoms: '' };
//           this.getPatients();
//         },
//         error: (err) => {
//           this.message = '❌ Error: ' + (err.error?.error || 'Registration failed');
//         }
//       });
//   }
  
//  getPatients() {
//     this.http.get<any[]>('http://localhost:5000/api/patients')
//       .subscribe(data => {
//         this.patients = data;
//       });
//   }

//    // already fetched from backend
// currentPage: number = 1;
// itemsPerPage: number = 8;

// get totalPages(): number {
//   return Math.ceil(this.patients.length / this.itemsPerPage);
// }

// getPaginatedPatients() {
//   const start = (this.currentPage - 1) * this.itemsPerPage;
//   return this.patients.slice(start, start + this.itemsPerPage);
// }

// nextPage() {
//   if (this.currentPage < this.totalPages) {
//     this.currentPage++;
//   }
// }

// prevPage() {
//   if (this.currentPage > 1) {
//     this.currentPage--;
//   }
// }

// logout() {
//   localStorage.removeItem('token');
//   window.location.href = '/login';
// }


// }



import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {}
