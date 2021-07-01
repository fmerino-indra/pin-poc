import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { KyberService } from '../kyber.service';

@Component({
  selector: 'app-kyber-dashboard',
  templateUrl: './kyber-dashboard.component.html',
  styleUrls: ['./kyber-dashboard.component.css']
})
export class KyberDashboardComponent implements OnInit {

    receivedText: string;
    greeting$: Observable<string>;

  constructor( private kyberService: KyberService ) { }

  ngOnInit() {
    // this.kyberService.sayHelloService()
    // .subscribe(retorno => {
    //     console.log(retorno);
    //     this.receivedText = retorno;
    // });
    this.greeting$ = this.kyberService.sayHelloService();

  }
}
