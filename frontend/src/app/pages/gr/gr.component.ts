import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { VendorApiService } from '../../services/vendor-api.service';

interface GoodsReceipt {
  Mblnr?: string;
  Ebeln?: string;
  Budat?: string;
  Maktx?: string;
  Ebelp?: string;
}

@Component({
  standalone: true,
  selector: 'app-gr',
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule
  ],
  template: `
    <section class="page-shell">
      <div class="page-header">
        <div>
          <span class="eyebrow">Receipts</span>
          <h1>Goods Receipts</h1>
          <p>All goods receipt records for the logged in vendor.</p>
        </div>
        <a mat-stroked-button routerLink="/dashboard" class="back-link">Back to dashboard</a>
      </div>

      <mat-card class="data-card">
        <div class="card-toolbar">
          <div>
            <mat-card-title>{{ grList.length }} goods receipts</mat-card-title>
            <mat-card-subtitle>Receipt, purchase order, posting date, material, and quantity references</mat-card-subtitle>
          </div>
          <div class="table-actions" *ngIf="grList.length">
            <mat-form-field appearance="outline" class="search-field">
              <mat-label>Search goods receipts</mat-label>
              <mat-icon matPrefix>search</mat-icon>
              <input
                matInput
                type="search"
                [value]="searchTerm"
                (input)="applyFilter($event)"
                placeholder="GR, PO, material, date, quantity"
              />
              <button
                *ngIf="searchTerm"
                mat-icon-button
                matSuffix
                type="button"
                aria-label="Clear search"
                (click)="clearFilter()"
              >
                <mat-icon>close</mat-icon>
              </button>
            </mat-form-field>
            <mat-chip-set aria-label="Goods receipt record count">
              <mat-chip>{{ dataSource.filteredData.length }} records</mat-chip>
            </mat-chip-set>
          </div>
        </div>
        <mat-divider></mat-divider>

        <div class="table-wrap" *ngIf="grList.length; else emptyState">
          <table mat-table [dataSource]="dataSource" class="gr-table">
            <ng-container matColumnDef="gr">
              <th mat-header-cell *matHeaderCellDef>GR</th>
              <td mat-cell *matCellDef="let item">
                <span class="primary-cell">{{ item.Mblnr || '-' }}</span>
              </td>
            </ng-container>

            <ng-container matColumnDef="po">
              <th mat-header-cell *matHeaderCellDef>PO</th>
              <td mat-cell *matCellDef="let item">{{ item.Ebeln || '-' }}</td>
            </ng-container>

            <ng-container matColumnDef="date">
              <th mat-header-cell *matHeaderCellDef>Date</th>
              <td mat-cell *matCellDef="let item">
                <span class="date-cell">
                  <mat-icon>event</mat-icon>
                  {{ formatDate(item.Budat) }}
                </span>
              </td>
            </ng-container>

            <ng-container matColumnDef="material">
              <th mat-header-cell *matHeaderCellDef>Material</th>
              <td mat-cell *matCellDef="let item">
                <span class="material-cell">{{ item.Maktx || '-' }}</span>
              </td>
            </ng-container>

            <ng-container matColumnDef="quantity">
              <th mat-header-cell *matHeaderCellDef>Qty</th>
              <td mat-cell *matCellDef="let item">
                <span class="quantity-code">{{ item.Ebelp || '-' }}</span>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>

            <tr class="mat-row no-results-row" *matNoDataRow>
              <td class="mat-cell" [attr.colspan]="displayedColumns.length">
                No goods receipts match your search.
              </td>
            </tr>
          </table>
        </div>
        <mat-paginator
          *ngIf="grList.length"
          [pageSize]="10"
          [pageSizeOptions]="[5, 10, 25, 50]"
          showFirstLastButtons
          aria-label="Goods receipt pagination"
        ></mat-paginator>
      </mat-card>

      <ng-template #emptyState>
        <p class="empty-message">No goods receipts found.</p>
      </ng-template>
    </section>
  `,
  styles: [
    `
      .page-shell{padding:2.25rem 1rem 3rem;max-width:1180px;margin:0 auto}
      .page-header{display:flex;justify-content:space-between;align-items:flex-end;gap:1rem;margin-bottom:1rem;padding:1.4rem;border:1px solid rgba(87,60,60,.12);border-radius:8px;background:#fff;box-shadow:0 18px 45px rgba(74,44,44,.08)}
      .eyebrow{display:block;margin-bottom:.4rem;color:#910102;font-size:.78rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase}
      h1{margin:0;color:#21191b;font-size:2.15rem;line-height:1.1}
      p{margin:.45rem 0 0;color:#695d60}
      .back-link{text-decoration:none}
      .data-card{overflow:hidden;border:1px solid rgba(87,60,60,.12);box-shadow:0 16px 38px rgba(67,40,40,.08);background:#fff}
      .card-toolbar{display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:1.2rem 1.35rem}
      mat-card-title{display:block;color:#21191b;font-size:1.1rem;font-weight:800}
      mat-card-subtitle{display:block;margin-top:.25rem;color:#74696c}
      mat-chip{font-weight:700}
      .table-actions{display:flex;align-items:center;justify-content:flex-end;gap:.8rem;flex:1}
      .search-field{width:min(420px,100%)}
      .search-field ::ng-deep .mat-mdc-form-field-subscript-wrapper{display:none}
      .search-field mat-icon{color:#76686b}
      .table-wrap{overflow:auto}
      .gr-table{width:100%;min-width:760px;background:#fff}
      .gr-table th{background:#f8f3ef;color:#5e5154;font-size:.75rem;font-weight:800;text-transform:uppercase;letter-spacing:.06em}
      .gr-table td{color:#2f292b}
      .gr-table th,.gr-table td{padding:0 1.15rem;border-bottom:1px solid rgba(87,60,60,.1)}
      .gr-table tr.mat-mdc-row{height:62px}
      .gr-table tr.mat-mdc-row:hover{background:#fff8f7}
      .primary-cell{font-weight:800;color:#21191b}
      .date-cell{display:inline-flex;align-items:center;gap:.4rem;color:#3a3033;font-weight:650}
      .date-cell mat-icon{width:18px;height:18px;font-size:18px;color:#910102}
      .material-cell{font-weight:650;color:#2f292b}
      .quantity-code{display:inline-flex;align-items:center;justify-content:center;min-width:48px;min-height:28px;padding:.15rem .5rem;border-radius:8px;background:#f5e8e7;color:#760407;font-weight:800}
      .no-results-row td{height:96px;padding:1.25rem!important;color:#777;text-align:center}
      mat-paginator{border-top:1px solid rgba(87,60,60,.1);background:#fff}
      .empty-message{display:flex;align-items:center;min-height:120px;margin:0;padding:1.25rem;color:#777}
      @media(max-width:820px){.card-toolbar{align-items:flex-start;flex-direction:column}.table-actions{width:100%;justify-content:space-between}.search-field{width:100%}}
      @media(max-width:720px){.page-shell{padding:1rem 0 2rem}.page-header{align-items:flex-start;flex-direction:column}h1{font-size:1.8rem}}
      @media(max-width:560px){.table-actions{align-items:stretch;flex-direction:column}}
    `  
  ]
})
export class GrComponent implements OnInit {
  @ViewChild(MatPaginator)
  set paginator(paginator: MatPaginator | undefined) {
    if (paginator) {
      this.dataSource.paginator = paginator;
    }
  }

  displayedColumns = ['gr', 'po', 'date', 'material', 'quantity'];
  grList: GoodsReceipt[] = [];
  dataSource = new MatTableDataSource<GoodsReceipt>([]);
  searchTerm = '';

  constructor(private api: VendorApiService, private cdr: ChangeDetectorRef) {
    this.dataSource.filterPredicate = (item, filter) => {
      const searchableValue = [
        item.Mblnr,
        item.Ebeln,
        this.formatDate(item.Budat),
        item.Maktx,
        item.Ebelp
      ]
        .join(' ')
        .toLowerCase();

      return searchableValue.includes(filter);
    };
  }

  async ngOnInit() {
    try {
      const response = await this.api.getGoodsReceipts();
      this.grList = response.data || [];
      this.dataSource.data = this.grList;
    } catch {
      this.grList = [];
      this.dataSource.data = [];
    }
    this.cdr.detectChanges();
  }

  applyFilter(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clearFilter() {
    this.searchTerm = '';
    this.dataSource.filter = '';

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  formatDate(value: string | null | undefined): string {
    if (!value) {
      return '-';
    }

    const raw = String(value).trim();
    const sapMatch = /\/Date\((-?\d+)(?:[+-]\d+)?\)\//.exec(raw);
    const compactMatch = /^(\d{4})(\d{2})(\d{2})$/.exec(raw);
    let date: Date;

    if (sapMatch) {
      date = new Date(Number(sapMatch[1]));
    } else if (compactMatch) {
      date = new Date(Number(compactMatch[1]), Number(compactMatch[2]) - 1, Number(compactMatch[3]));
    } else {
      date = new Date(raw);
    }

    if (Number.isNaN(date.getTime())) {
      return raw;
    }

    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(date);
  }
}
