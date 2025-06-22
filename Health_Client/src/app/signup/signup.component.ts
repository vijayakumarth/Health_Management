// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-signup',
//   imports: [],
//   templateUrl: './signup.component.html',
//   styleUrl: './signup.component.css'
// })
// export class SignupComponent {

// }



// import { Component } from '@angular/core';
// import { Router, RouterModule } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';
// import { AuthService } from '../guards/auth.service';

// @Component({
//   selector: 'app-signup',
//   standalone: true,
//   imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
//   templateUrl: './signup.component.html'
// })
// export class SignupComponent {
//   user = { firstname: '', lastname: '', username: '', password: '', confirmPassword: '' };
//   message = '';

//   constructor(private authService: AuthService, private router: Router) {}

//   signup() {
//     if (this.user.password !== this.user.confirmPassword) {
//       this.message = '❌ Passwords do not match';
//       return;
//     }

//     this.authService.signup(this.user).subscribe({
//       next: () => {
//         this.message = '✅ Signup successful!';
//         setTimeout(() => this.router.navigate(['/login']), 1500);
//       },
//       error: (err) => {
//         this.message = `❌ ${err.error?.error || 'Signup failed'}`;
//       }
//     });
//   }
// }




import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../guards/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupData = {
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    confirmPassword: ''
  };

  message = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSignup() {
    if (this.signupData.password !== this.signupData.confirmPassword) {
      this.message = "❌ Passwords do not match";
      return;
    }

    this.http.post('http://localhost:5000/api/auth/signup', this.signupData).subscribe({
      next: () => {
        this.message = '✅ Signup successful. Redirecting to login...';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: err => {
        this.message = '❌ ' + (err.error?.error || 'Signup failed');
      }
    });
  }
}


