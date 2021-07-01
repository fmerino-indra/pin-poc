import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CommonModel } from '../../model/common-model';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {
  token: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(
        (params) =>  {
            let commonModel: CommonModel;
            console.log('Los queryParams');
            console.log(params);
            if (params.token) {
                this.token = params.token;
                commonModel = new CommonModel();
                commonModel.assignToken(this.token);
                localStorage.setItem('commonModel', JSON.stringify(commonModel));
                this.redirect();
            }
        }
    );
  }

  redirect() {
    this.router.navigate(['/kyber']);
  }
}
