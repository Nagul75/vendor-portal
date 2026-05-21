import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { VendorApiService } from '../../services/vendor-api.service';

@Component({
  standalone: true,
  selector: 'app-profile',
  imports: [CommonModule, MatCardModule],
  template: `
    <section class="page-shell">
      <div class="hero-panel">
        <span class="eyebrow">Account details</span>
        <h1>Profile</h1>
        <p>Vendor master data connected to the current login.</p>
      </div>
      <mat-card class="profile-card" *ngIf="profile; else loading">
        <dl>
          <div><dt>Vendor ID</dt><dd>{{ profile.Lifnr }}</dd></div>
          <div><dt>Name</dt><dd>{{ profile.Name1 }}</dd></div>
          <div><dt>City</dt><dd>{{ profile.City }}</dd></div>
          <div><dt>Country</dt><dd>{{ profile.Country }}</dd></div>
          <div><dt>Email</dt><dd>{{ profile.Email || 'N/A' }}</dd></div>
          <div><dt>Phone</dt><dd>{{ profile.Phone || 'N/A' }}</dd></div>
        </dl>
      </mat-card>
      <ng-template #loading>
        <p class="empty-message">Loading profile…</p>
      </ng-template>
    </section>
  `,
  styles: [
    `
      .page-shell{max-width:860px;margin:0 auto;padding:2.25rem 1rem 3rem}
      .hero-panel{margin-bottom:1rem;padding:1.6rem;border:1px solid rgba(87,60,60,.12);border-radius:8px;background:linear-gradient(135deg,#fff,rgba(255,250,246,.84));box-shadow:0 18px 45px rgba(74,44,44,.08)}
      .eyebrow{display:block;margin-bottom:.4rem;color:#910102;font-size:.78rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase}
      h1{margin:0;color:#21191b;font-size:2.25rem;line-height:1.1}
      p{margin:.45rem 0 0;color:#695d60}
      .profile-card{padding:1.25rem;border:1px solid rgba(87,60,60,.12);box-shadow:0 16px 38px rgba(67,40,40,.08)}
      dl{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem;margin:0}
      dl div{padding:1rem;border-radius:8px;background:#fbf8f5;border:1px solid rgba(87,60,60,.1)}
      dt{margin-bottom:.35rem;font-size:.76rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:#7a6b6e}
      dd{margin:0;color:#2f292b;font-weight:700}
      .empty-message{color:#777}
      @media (max-width:680px){.page-shell{padding:1rem 0 2rem}dl{grid-template-columns:1fr}h1{font-size:1.8rem}}
    `  
  ]
})
export class ProfileComponent implements OnInit {
  profile: any | null = null;

  constructor(private api: VendorApiService, private cdr: ChangeDetectorRef) {}

  async ngOnInit() {
    try {
      const response = await this.api.getProfile();
      this.profile = response.data;
      this.cdr.detectChanges();
    } catch {
      this.profile = null;
      this.cdr.detectChanges();
    }
  }
}
