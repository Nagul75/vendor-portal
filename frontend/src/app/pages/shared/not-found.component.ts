import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-not-found',
  imports: [RouterModule],
  template: `
    <section class="page-shell">
      <h1>Page not found</h1>
      <p>The page you were looking for does not exist.</p>
      <a routerLink="/dashboard">Return to dashboard</a>
    </section>
  `,
  styles: [
    ".page-shell{max-width:680px;margin:6rem auto;padding:0 1rem;text-align:center} h1{margin:0;font-size:2.25rem} p{margin:1rem 0;color:#555} a{display:inline-block;padding:.85rem 1.25rem;background:#910102;color:#fff;border-radius:.75rem;text-decoration:none}"
  ]
})
export class NotFoundComponent {}
