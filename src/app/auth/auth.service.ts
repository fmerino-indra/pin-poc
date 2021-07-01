import { Injectable } from '@angular/core';
import { CommonModel } from '../model/common-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    redirectUrl: string;

  constructor() { }

  checkLogin(url: string): boolean {
      const commonModel: CommonModel = JSON.parse(localStorage.getItem('commonModel'));
      if (commonModel) {
          return true;
      }

      this.redirectUrl = url;
      return false;
  }

}
