import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule, MatButtonModule, MatCardModule, MatInputModule],
  template: `
    <section class="page-shell">
      <mat-card class="login-card">
        <span class="eyebrow">Secure vendor access</span>
        <h1>Vendor Login</h1>
        <p>Sign in to review procurement and finance activity for your account.</p>

        <form (ngSubmit)="submit()" class="form-grid">
          <mat-form-field appearance="outline">
            <mat-label>Vendor ID</mat-label>
            <input
              matInput
              type="text"
              name="vendorId"
              required
              [(ngModel)]="vendorId"
              autocomplete="username"
            />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Password</mat-label>
            <input
              matInput
              type="password"
              name="password"
              required
              [(ngModel)]="password"
              autocomplete="current-password"
            />
          </mat-form-field>

          <button mat-flat-button type="submit" [disabled]="loading">Login</button>
        </form>

        <p class="error" *ngIf="error">{{ error }}</p>
      </mat-card>
    </section>
  `,
  styles: [
    `
      .page-shell{min-height:calc(100vh - 96px);display:grid;place-items:center;padding:2rem 1rem}
      .login-card{width:min(500px,100%);padding:2rem;border:1px solid rgba(87,60,60,.12);box-shadow:0 24px 60px rgba(62,38,38,.12);background:linear-gradient(145deg,#fff,#fff9f5)}
      .eyebrow{display:block;margin-bottom:.45rem;color:#910102;font-size:.78rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase}
      h1{margin:0;color:#21191b;font-size:2rem;line-height:1.1}
      p{margin:.6rem 0 1.5rem;color:#695d60}
      .form-grid{display:grid;gap:.8rem}
      mat-form-field{width:100%}
      button{width:100%;min-height:46px;font-weight:700}
      .error{margin:1rem 0 0;color:#b00020;font-weight:650}
    `  
  ]
})
export class LoginComponent {
  vendorId = '';
  password = '';
  error = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {
    if (this.auth.isLoggedIn()) {
      void this.router.navigate(['/dashboard']);
    }
  }

  async submit() {
    this.error = '';
    this.loading = true;

    try {
      const response = await this.auth.login(this.vendorId.trim(), this.password.trim());
      if (response.success && response.data?.vendorId) {
        this.auth.setVendorId(response.data.vendorId);
        void this.router.navigate(['/dashboard']);
      } else {
        this.error = 'Login failed. Check your credentials and try again.';
      }
    } catch (error) {
      this.error = 'Login failed. Please verify vendor ID and password.';
    } finally {
      this.loading = false;
    }
  }
}
