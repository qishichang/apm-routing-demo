import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { AuthGuard } from './user/auth.guard';
import { SelectiveStrategy } from './selective-strategy.services';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'products',
    canActivate: [ AuthGuard ],
    data: { preload: false },
    loadChildren: () =>
      import('./products/product.module').then(m => m.ProductModule)},
  { path: '', redirectTo: 'welcome', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: true, preloadingStrategy: SelectiveStrategy })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
