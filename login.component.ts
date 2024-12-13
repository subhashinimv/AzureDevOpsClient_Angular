import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  private apiUrl = 'https://localhost:7249/api/auth/login'; 

  constructor(private http: HttpClient, private router: Router) { }

  login(): void {
    this.http.post<{ token: string }>(this.apiUrl, {
      username: this.username,
      password: this.password
    }).subscribe(
      response => {
        // Store the JWT token in localStorage
        localStorage.setItem('token', response.token);
        this.router.navigate(['/tasks']);
      },
      error => {
        this.errorMessage = 'Invalid username or password';
      }
    );
  }
}