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
            <a mat-flat-button routerLink="/invoice">Open</a>
          </mat-card-actions>
        </mat-card>
        <mat-card class="portal-card">
          <mat-card-header>
            <mat-card-title>Payment Aging</mat-card-title>
            <mat-card-subtitle>Due dates, status, and aging days</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <strong>{{ paymentCount }}</strong>
            <span>records</span>
          </mat-card-content>
          <mat-card-actions align="end">
            <a mat-flat-button routerLink="/payment-aging">Open</a>
          </mat-card-actions>
        </mat-card>
        <mat-card class="portal-card">
          <mat-card-header>
            <mat-card-title>Credit / Debit Memo</mat-card-title>
            <mat-card-subtitle>Memo adjustments and references</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <strong>{{ memoCount }}</strong>
            <span>records</span>
          </mat-card-content>
          <mat-card-actions align="end">
            <a mat-flat-button routerLink="/memo">Open</a>
          </mat-card-actions>
        </mat-card>
      </nav>
    </section>
  `,
  styles: [
    `
      .page-shell{padding:2.25rem 1rem 3rem;max-width:1180px;margin:0 auto}
      .hero-panel{margin-bottom:1.25rem;padding:1.6rem;border:1px solid rgba(87,60,60,.12);border-radius:8px;background:linear-gradient(135deg,#fff,rgba(255,250,246,.84));box-shadow:0 18px 45px rgba(74,44,44,.08)}
      .eyebrow{display:block;margin-bottom:.4rem;color:#910102;font-size:.78rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase}
      h1{margin:0;color:#21191b;font-size:2.25rem;line-height:1.1}
      p{margin:.45rem 0 0;color:#695d60;max-width:620px}
      .portal-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:1rem}
      .portal-card{position:relative;border-radius:0px;min-height:184px;border:1px solid rgba(87,60,60,.12);box-shadow:0 14px 34px rgba(67,40,40,.07);overflow:hidden;background:#fff;transition:border-color .2s ease,box-shadow .2s ease,transform .2s ease}
      .portal-card::before{content:"";position:absolute;inset:0 auto 0 0;width:5px;background:#910102;transform:scaleY(0);transform-origin:top;transition:transform .22s ease}
      .portal-card:hover,.portal-card:focus-within{border-color:rgba(145,1,2,.28);box-shadow:0 22px 48px rgba(67,40,40,.12);transform:translateY(-2px)}
      .portal-card:hover::before,.portal-card:focus-within::before{transform:scaleY(1)}
      mat-card-content{display:flex;align-items:baseline;gap:.5rem;padding-top:1.25rem}
      mat-card-content strong{color:#241f21;font-size:2.4rem;line-height:1;font-weight:800}
      mat-card-content span{color:#74696c;font-weight:600}
      mat-card-actions{padding:0 1rem 1rem;opacity:0;transform:translateY(6px);transition:opacity .2s ease,transform .2s ease}
      .portal-card:hover mat-card-actions,.portal-card:focus-within mat-card-actions{opacity:1;transform:translateY(0)}
      mat-card-actions a{text-decoration:none;background:#910102!important;color:#fff!important;box-shadow:0 10px 22px rgba(145,1,2,.2)}
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
