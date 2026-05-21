import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FinanceComponent } from './pages/finance/finance.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { PaymentAgingComponent } from './pages/payment-aging/payment-aging.component';
import { MemoComponent } from './pages/memo/memo.component';
import { PoComponent } from './pages/po/po.component';
import { RfqComponent } from './pages/rfq/rfq.component';
import { GrComponent } from './pages/gr/gr.component';
import { NotFoundComponent } from './pages/shared/not-found.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'finance', component: FinanceComponent, canActivate: [authGuard] },
  { path: 'invoice', component: InvoiceComponent, canActivate: [authGuard] },
  { path: 'payment-aging', component: PaymentAgingComponent, canActivate: [authGuard] },
  { path: 'memo', component: MemoComponent, canActivate: [authGuard] },
  { path: 'po', component: PoComponent, canActivate: [authGuard] },
  { path: 'rfq', component: RfqComponent, canActivate: [authGuard] },
  { path: 'gr', component: GrComponent, canActivate: [authGuard] },
  { path: '**', component: NotFoundComponent },
];
