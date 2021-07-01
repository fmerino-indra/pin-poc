import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KyberComponent } from './kyber/kyber.component';
import { KyberPinComponent } from './kyber-pin/kyber-pin.component';
import { KyberTokenComponent } from './kyber-token/kyber-token.component';
import { KyberDashboardComponent } from './kyber-dashboard/kyber-dashboard.component';
import { AuthGuard } from '../auth/auth.guard';

const adminRoutes: Routes = [
    {
        path: 'kyber',
        component: KyberComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                children: [
                    {
                        path: 'kyber-pin',
                        component: KyberPinComponent
                    },
                    {
                        path: 'kyber-token',
                        component: KyberTokenComponent
                    },
                    {
                        path: '',
                        component: KyberDashboardComponent
                    }
                ]
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class KyberRoutingModule { }
