import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { VendorApiService } from '../../services/vendor-api.service';

@Component({
  standalone: true,
  selector: 'app-memo',
  imports: [CommonModule, RouterModule, MatButtonModule, MatCardModule, MatDividerModule],
  template: `
    <section class="page-shell">
      <div class="page-header">
        <div>
          <span class="eyebrow">Finance</span>
          <h1>Credit / Debit Memo</h1>
          <p>Memo records for your vendor account.</p>
        </div>
        <a mat-stroked-button routerLink="/finance" class="back-link">Back to finance</a>
      </div>

      <mat-card class="data-card">
        <mat-card-header>
          <mat-card-title>{{ memoList.length }} memo records</mat-card-title>
          <mat-card-subtitle>Credit and debit memo documents for this vendor</mat-card-subtitle>
        </mat-card-header>
        <mat-divider></mat-divider>
        <div class="table-wrap">
          <table *ngIf="memoList.length; else emptyState">
            <thead>
              <tr>
                <th>Doc No</th>
                <th>Type</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Currency</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let item of memoList">
                <td>{{ item.DocNo }}</td>
                <td>{{ item.MemoType }}</td>
                <td>{{ item.DocDate }}</td>
                <td>{{ item.Amount }}</td>
                <td>{{ item.Currency }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </mat-card>

      <ng-template #emptyState>
        <p class="empty-message">No memo records found.</p>
      </ng-template>
    </section>
  `,
  styles: [
    ".page-shell{padding:2.25rem 1rem 3rem;max-width:1180px;margin:0 auto}.page-header{display:flex;justify-content:space-between;align-items:flex-end;gap:1rem;margin-bottom:1rem;padding:1.4rem;border:1px solid rgba(87,60,60,.12);border-radius:8px;background:#fff;box-shadow:0 18px 45px rgba(74,44,44,.08)}.eyebrow{display:block;margin-bottom:.4rem;color:#4f46e5;font-size:.78rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase}h1{margin:0;color:#21191b;font-size:2.15rem;line-height:1.1}p{margin:.45rem 0 0;color:#695d60}.back-link{text-decoration:none}.data-card{border:1px solid rgba(87,60,60,.12);box-shadow:0 16px 38px rgba(67,40,40,.08)}.table-wrap{overflow:auto}table{width:100%;min-width:720px;border-collapse:collapse}th,td{padding:1rem;border-bottom:1px solid rgba(87,60,60,.1);text-align:left}th{background:#fbf8f5;color:#5e5154;font-size:.78rem;text-transform:uppercase;letter-spacing:.06em}td{color:#2f292b}tr:last-child td{border-bottom:0}.empty-message{color:#777;margin:1.25rem}@media(max-width:720px){.page-shell{padding:1rem 0 2rem}.page-header{align-items:flex-start;flex-direction:column}h1{font-size:1.8rem}}"  
  ]
})
export class MemoComponent implements OnInit {
  memoList: any[] = [];

  constructor(private api: VendorApiService, private cdr: ChangeDetectorRef) {}

  async ngOnInit() {
    try {
      const response = await this.api.getMemos();
      this.memoList = response.data || [];
    } catch {
      this.memoList = [];
    }
    this.cdr.detectChanges();
  }
}
