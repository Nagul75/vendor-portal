import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { VendorApiService } from '../../services/vendor-api.service';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule, MatButtonModule, MatCardModule, MatDividerModule],
  template: `
    <section class="page-shell">
      <div class="hero-panel">
        <div>
          <span class="eyebrow">Vendor command center</span>
          <h1>Dashboard</h1>
          <p>Track procurement activity, open requests, and goods movement.</p>
        </div>
      </div>

      <nav class="portal-grid" aria-label="Dashboard portals">
        <mat-card class="portal-card">
          <mat-card-header>
            <mat-card-title>Purchase Orders</mat-card-title>
            <mat-card-subtitle>Released and historical orders</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <strong>{{ poList.length }}</strong>
            <span>records</span>
          </mat-card-content>
          <mat-card-actions align="end">
            <a mat-flat-button routerLink="/po">Open portal</a>
          </mat-card-actions>
        </mat-card>

        <mat-card class="portal-card accent-card">
          <mat-card-header>
            <mat-card-title>RFQs</mat-card-title>
            <mat-card-subtitle>Quotation requests awaiting review</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <strong>{{ rfqList.length }}</strong>
            <span>records</span>
          </mat-card-content>
          <mat-card-actions align="end">
            <a mat-flat-button routerLink="/rfq">Open portal</a>
          </mat-card-actions>
        </mat-card>

        <mat-card class="portal-card neutral-card">
          <mat-card-header>
            <mat-card-title>Goods Receipts</mat-card-title>
            <mat-card-subtitle>Receipt confirmations and references</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <strong>{{ grList.length }}</strong>
            <span>records</span>
          </mat-card-content>
          <mat-card-actions align="end">
            <a mat-flat-button routerLink="/gr">Open portal</a>
          </mat-card-actions>
        </mat-card>
      </nav>

      <div *ngIf="error" class="error-banner">{{ error }}</div>
    </section>
  `,
  styles: [
    `
      .page-shell{padding:2.25rem 1rem 3rem;max-width:1180px;margin:0 auto}
      .hero-panel{display:flex;justify-content:space-between;gap:1rem;align-items:flex-end;margin-bottom:1.25rem;padding:1.6rem;border:1px solid rgba(87,60,60,.12);border-radius:8px;background:linear-gradient(135deg,#fff,rgba(255,250,246,.84));box-shadow:0 18px 45px rgba(74,44,44,.08)}
      .eyebrow{display:block;margin-bottom:.4rem;color:#910102;font-size:.78rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase}
      h1{margin:0;color:#21191b;font-size:2.25rem;line-height:1.1}
      p{margin:.45rem 0 0;color:#695d60;max-width:620px}
      .portal-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1rem;margin-bottom:1.25rem}
      .portal-card{border:1px solid rgba(145,1,2,.12);box-shadow:0 16px 38px rgba(67,40,40,.08);overflow:hidden}
      .portal-card::before{content:"";display:block;height:5px;background:#910102}
      .accent-card::before{background:#0f766e}
      .neutral-card::before{background:#4f46e5}
      mat-card-content{display:flex;align-items:baseline;gap:.5rem;padding-top:1.25rem}
      mat-card-content strong{color:#241f21;font-size:2.3rem;line-height:1;font-weight:800}
      mat-card-content span{color:#74696c;font-weight:600}
      mat-card-actions{padding:0 1rem 1rem}
      mat-card-actions a{text-decoration:none}
      .error-banner{margin:0 0 1rem;padding:1rem;border-radius:8px;background:#fff1f1;color:#9f1239;border:1px solid #fecdd3;font-weight:650}
      .table-card{box-shadow:0 16px 38px rgba(67,40,40,.08);border:1px solid rgba(87,60,60,.12)}
      .table-wrap{overflow:auto}
      table{width:100%;border-collapse:collapse;min-width:640px}
      th,td{padding:1rem;text-align:left;border-bottom:1px solid rgba(87,60,60,.1)}
      th{color:#5e5154;background:#fbf8f5;font-size:.78rem;text-transform:uppercase;letter-spacing:.06em}
      td{color:#2f292b}
      tr:last-child td{border-bottom:0}
      .empty-message{color:#777;margin:1.25rem}
      @media (max-width:720px){.page-shell{padding:1rem 0 2rem}.hero-panel{padding:1.2rem}h1{font-size:1.8rem}}
    `  
  ]
})
export class DashboardComponent implements OnInit {
  poList: any[] = [];
  rfqList: any[] = [];
  grList: any[] = [];
  error = '';

  constructor(private api: VendorApiService, private cdr: ChangeDetectorRef) {}

  async ngOnInit() {
    const poPromise = this.api.getPurchaseOrders().then((response) => {
      this.poList = response.data || [];
      this.cdr.detectChanges();
    }).catch((error) => {
      console.error('PO load failed', error);
      this.error = 'Failed to load purchase orders.';
      this.cdr.detectChanges();
    });

    const rfqPromise = this.api.getRfqs().then((response) => {
      this.rfqList = response.data || [];
      this.cdr.detectChanges();
    }).catch((error) => {
      console.error('RFQ load failed', error);
      this.error = 'Failed to load RFQs.';
      this.cdr.detectChanges();
    });

    const grPromise = this.api.getGoodsReceipts().then((response) => {
      this.grList = response.data || [];
      this.cdr.detectChanges();
    }).catch((error) => {
      console.error('GR load failed', error);
      this.error = 'Failed to load goods receipts.';
      this.cdr.detectChanges();
    });

    await Promise.all([poPromise, rfqPromise, grPromise]);
  }
}
