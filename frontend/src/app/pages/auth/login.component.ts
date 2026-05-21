import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  template: `
    <section class="page-shell">
      <div class="brand-panel" aria-hidden="true">
        <div class="brand-icon">
          <mat-icon>storefront</mat-icon>
        </div>
        <div>
          <h1>Vendor Portal</h1>
          <p class="lead">Self-service access to your purchase orders, invoices, and payment activity in one place.</p>
        </div>
        <div class="benefit-list">
          <div>
            <span><mat-icon>receipt_long</mat-icon></span>
            <p class="benefit-description">Review purchase orders and RFQs</p>
          </div>
          <div>
            <span><mat-icon>inventory_2</mat-icon></span>
            <p class="benefit-description">Track goods receipts and references</p>
          </div>
          <div>
            <span><mat-icon>account_balance_wallet</mat-icon></span>
            <p class="benefit-description">View invoices, memos, and aging</p>
          </div>
        </div>
        <small>© Vendor Portal</small>
      </div>

      <div class="form-panel">
        <div class="form-shell">
          <div class="card-heading">
            <h2>Welcome back</h2>
            <p>Sign in with your vendor credentials to continue.</p>
          </div>

          <form (ngSubmit)="submit()" class="form-grid">
            <mat-form-field appearance="outline">
              <mat-label>Vendor ID</mat-label>
              <mat-icon matPrefix>tag</mat-icon>
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
              <mat-icon matPrefix>lock</mat-icon>
              <input
                matInput
                [type]="hidePassword ? 'password' : 'text'"
                name="password"
                required
                [(ngModel)]="password"
                autocomplete="current-password"
              />
              <button
                mat-icon-button
                matSuffix
                type="button"
                [attr.aria-label]="hidePassword ? 'Show password' : 'Hide password'"
                (click)="hidePassword = !hidePassword"
              >
                <mat-icon>{{ hidePassword ? 'visibility_off' : 'visibility' }}</mat-icon>
              </button>
            </mat-form-field>

            <button
              mat-flat-button
              class="login-submit"
              type="submit"
              [disabled]="loading || !vendorId.trim() || !password.trim()"
            >
              <mat-spinner *ngIf="loading" diameter="18"></mat-spinner>
              <span>{{ loading ? 'Signing in' : 'Sign in' }}</span>
              <mat-icon *ngIf="!loading">arrow_forward</mat-icon>
            </button>
          </form>

          <p class="error" *ngIf="error">{{ error }}</p>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .page-shell{min-height:100vh;display:grid;grid-template-columns:minmax(0,1.35fr) minmax(420px,.95fr);background:#fff8f6}
      .brand-panel{position:relative;display:flex;flex-direction:column;min-height:100vh;padding:4rem;overflow:hidden;color:#fff;background:linear-gradient(135deg,#9b3f2a 0%,#bf1c18 48%,#d6352f 100%)}
      .brand-panel::before{content:"";position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,.14) 1px,transparent 1px);background-size:6px 6px;opacity:.28}
      .brand-panel>*{position:relative}
      .brand-icon{display:grid;place-items:center;width:64px;height:64px;margin-bottom:1.9rem;border:1px solid rgba(255,255,255,.28);border-radius:18px;background:rgba(255,255,255,.14);box-shadow:inset 0 1px 0 rgba(255,255,255,.18)}
      .brand-icon mat-icon{width:30px;height:30px;font-size:30px}
      h1,h2,p{margin:0}
      h1{max-width:560px;font-size:3rem;font-weight:800;line-height:1.06;letter-spacing:0}
      .lead{max-width:560px;margin-top:1.45rem;color:rgba(255,255,255,.92);font-size:1.12rem;font-weight:500;line-height:1.55}
      .benefit-list{display:grid;gap:1rem;margin-top:3.2rem}
      .benefit-list div{display:flex;align-items:center;gap:1rem}
      .benefit-list span{display:grid;place-items:center;width:38px;height:38px;border-radius:10px;background:rgba(255,255,255,.13)}
      .benefit-list mat-icon{width:20px;height:20px;font-size:20px}
      .benefit-list strong{font-size:1rem;font-weight:600;line-height:1.4}
      small{margin-top:auto;color:rgba(255,255,255,.68);font-size:.84rem;font-weight:600;letter-spacing:.03em}
      .form-panel{display:grid;place-items:center;min-height:100vh;padding:3rem;background:#fff8f6}
      .form-shell{width:min(476px,100%)}
      .card-heading{margin-bottom:1.55rem}
      h2{color:#21191b;font-size:2.05rem;font-weight:800;line-height:1.1}
      .card-heading p{margin-top:.45rem;color:#5d4648;font-size:1.05rem}
      .form-grid{display:grid;gap:1.2rem}
      mat-form-field{width:100%}
      mat-icon[matPrefix]{margin:0 .75rem 0 .25rem;color:#5c3f42}
      button[matSuffix]{margin-right:.25rem;color:#5c3f42}
      .login-submit{display:inline-flex;align-items:center;justify-content:center;gap:.55rem;width:100%;min-height:60px;margin-top:.7rem;border-radius:12px!important;background:#910102!important;color:#fff!important;font-size:1rem;font-weight:800;box-shadow:0 12px 26px rgba(145,1,2,.22);transition:background-color .2s ease,box-shadow .2s ease,transform .2s ease}
      .login-submit mat-icon{width:20px;height:20px;font-size:20px}
      .login-submit:hover:not(:disabled){background:#760407!important;box-shadow:0 16px 32px rgba(145,1,2,.28);transform:translateY(-1px)}
      .login-submit:active:not(:disabled){transform:translateY(0)}
      .login-submit:disabled{background:#d8cdcf!important;color:#776b6e!important;box-shadow:none}
      mat-spinner{--mdc-circular-progress-active-indicator-color:#fff}
      .error{margin:1rem 0 0;padding:.8rem .9rem;border-radius:8px;background:#fff2f2;color:#b00020;font-weight:650}
      @media(max-width:920px){.page-shell{grid-template-columns:1fr}.brand-panel{min-height:auto;padding:2.5rem}.form-panel{min-height:auto;padding:2.5rem 1.25rem}h1{font-size:2.35rem}.lead{font-size:1.04rem}.benefit-list{margin-top:2rem}small{margin-top:2.5rem}}
      @media(max-width:560px){.brand-panel{padding:2rem 1.25rem}.brand-icon{width:56px;height:56px;border-radius:16px}h1{font-size:2rem}h2{font-size:1.7rem}.benefit-list strong{font-size:.94rem}.form-panel{padding:2rem 1rem}.login-submit{min-height:54px}}
    `  
  ]
})
export class LoginComponent {
  vendorId = '';
  password = '';
  error = '';
  loading = false;
  hidePassword = true;

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
