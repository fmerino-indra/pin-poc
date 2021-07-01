import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './http-interceptors/index';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppheaderComponent } from './appheader/appheader.component';

import { KyberModule } from './kyber/kyber.module';
import { AuthModule } from './auth/auth.module';
import { CryptoModule } from './crypto/crypto.module';

@NgModule({
  declarations: [
    AppComponent,
    AppheaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    KyberModule,
    CryptoModule,
    AuthModule,
    AppRoutingModule
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
