import { Component, OnInit } from '@angular/core';
import { ACCESS_TOKEN, WSO2IS_AUTH_URL } from '../../constants/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    wso2isAuthUrl = WSO2IS_AUTH_URL;
  constructor() { }

  ngOnInit() {
  }

}
