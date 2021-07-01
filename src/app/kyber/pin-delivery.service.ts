import { Injectable } from '@angular/core';
import { AbstractHttpService } from '../abstract-http.service';
import { PinDeliveryResponse } from '../model/pin-delivery-response';
import { PIN_DELIVERY } from '../constants/constants';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PinDeliveryService extends AbstractHttpService {

    constructor(private http: HttpClient) {
        super();
    }

    pinRequestPINBlock(nonce: string): Observable<PinDeliveryResponse> {
        const parametros = new HttpParams()
            .set('nonce', nonce);
        return this.http.get<PinDeliveryResponse>(PIN_DELIVERY, {
            params: parametros
            // withCredentials: true
        })
            .pipe(
                tap( _ => {
                    this.log('PINBlock Request');
                }),
                catchError(this.handleError<PinDeliveryResponse>('PinDeliveryService: PIN Block Request', new PinDeliveryResponse()))
            );
    }
}
