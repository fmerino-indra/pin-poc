import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animations';
import { CryptoService } from './crypto/crypto.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    animations: [slideInAnimation]
})
export class AppComponent  implements OnInit {
    title = 'PIN Reminder';
    miVariable: any;

    constructor(
        private cryptoService: CryptoService

    ) { }

    ngOnInit() {
        localStorage.removeItem('commonModel');
        // this.cryptoService.testSymmetric();
        // this.cryptoService.test3('Felix');
    }
    getAnimationData(outlet: RouterOutlet) {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    }
}
