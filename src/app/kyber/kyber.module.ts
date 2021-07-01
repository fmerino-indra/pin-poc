import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KyberRoutingModule } from './kyber-routing.module';
import { KyberDashboardComponent } from './kyber-dashboard/kyber-dashboard.component';
import { KyberPinComponent } from './kyber-pin/kyber-pin.component';
import { KyberTokenComponent } from './kyber-token/kyber-token.component';
import { KyberComponent } from './kyber/kyber.component';


@NgModule({
  declarations: [KyberDashboardComponent, KyberPinComponent, KyberTokenComponent, KyberComponent],
  imports: [
    CommonModule,
    KyberRoutingModule
  ]
})
export class KyberModule { }
