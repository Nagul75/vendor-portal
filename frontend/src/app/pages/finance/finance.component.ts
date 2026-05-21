import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { VendorApiService } from '../../services/vendor-api.service';

@Component({
  standalone: true,
  selector: 'app-finance',
  imports: [CommonModule, RouterModule, MatButtonModule, MatCardModule],
  template: `
    <section class="page-shell">
      <div class="hero-panel">
        <div>
          <span class="eyebrow">Financial workspace</span>
          <h1>Finance</h1>
          <p>Review invoices, aging exposure, and memo activity in focused finance portals.</p>
        </div>
      </div>

      <nav class="portal-grid" aria-label="Finance portals">
        <mat-card class="portal-card">
          <mat-card-header>
            <mat-card-title>Invoices</mat-card-title>
            <mat-card-subtitle>Submitted and posted invoice records</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <strong>{{ invoiceCount }}</strong>
            <span>records</span>
          </mat-card-content>
          <mat-card-actions align="end">
            <a mat-flat-button routerLink="/invoice">Open portal</a>
          </mat-card-actions>
        </mat-card>
        <mat-card class="portal-card aging-card">
          <mat-card-header>
            <mat-card-title>Payment Aging</mat-card-title>
            <mat-card-subtitle>Due dates, status, and aging days</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <strong>{{ paymentCount }}</strong>
            <span>records</span>
          </mat-card-content>
          <mat-card-actions align="end">
            <a mat-flat-button routerLink="/payment-aging">Open portal</a>
          </mat-card-actions>
        </mat-card>
        <mat-card class="portal-card memo-card">
          <mat-card-header>
            <mat-card-title>Credit / Debit Memo</mat-card-title>
            <mat-card-subtitle>Memo adjustments and references</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <strong>{{ memoCount }}</strong>
            <span>records</span>
          </mat-card-content>
          <mat-card-actions align="end">
            <a mat-flat-button routerLink="/memo">Open portal</a>
          </mat-card-actions>
        </mat-card>
      </nav>
    </section>
  `,
  styles: [
    `
      .page-shell{padding:2.25rem 1rem 3rem;max-width:1180px;margin:0 auto}
      .hero-panel{margin-bottom:1.25rem;padding:1.6rem;border:1px solid rgba(87,60,60,.12);border-radius:8px;background:linear-gradient(135deg,#fff,rgba(248,252,250,.88));box-shadow:0 18px 45px rgba(74,44,44,.08)}
      .eyebrow{display:block;margin-bottom:.4rem;color:#0f766e;font-size:.78rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase}
      h1{margin:0;color:#21191b;font-size:2.25rem;line-height:1.1}
      p{margin:.45rem 0 0;color:#695d60;max-width:620px}
      .portal-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:1rem}
      .portal-card{border:1px solid rgba(15,118,110,.14);box-shadow:0 16px 38px rgba(54,69,63,.08);overflow:hidden}
      .portal-card::before{content:"";display:block;height:5px;background:#0f766e}
      .aging-card::before{background:#910102}
      .memo-card::before{background:#4f46e5}
      mat-card-content{display:flex;align-items:baseline;gap:.5rem;padding-top:1.25rem}
      mat-card-content strong{color:#241f21;font-size:2.4rem;line-height:1;font-weight:800}
      mat-card-content span{color:#74696c;font-weight:600}
      mat-card-actions{padding:0 1rem 1rem}
      mat-card-actions a{text-decoration:none}
      @media (max-width:720px){.page-shell{padding:1rem 0 2rem}.hero-panel{padding:1.2rem}h1{font-size:1.8rem}}
    `  
  ]
})
export class FinanceComponent implements OnInit {
  invoiceCount = 0;
  paymentCount = 0;
  memoCount = 0;

  constructor(private api: VendorApiService, private cdr: ChangeDetectorRef) {}

  async ngOnInit() {
    try {
      const [invoice, payment, memo] = await Promise.all([
        this.api.getInvoices(),
        this.api.getPaymentAging(),
        this.api.getMemos(),
      ]);
      this.invoiceCount = invoice.data.length;
      this.paymentCount = payment.data.length;
      this.memoCount = memo.data.length;
    } catch {
      this.invoiceCount = 0;
      this.paymentCount = 0;
      this.memoCount = 0;
    }
    this.cdr.detectChanges();
  }
}
