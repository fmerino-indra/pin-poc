import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { HELLO_KYBER, NEGOTIATE_KYBER, SEND_PUBKEY_KYBER, HELLO_REMINDER } from '../constants/constants';
import { NegotiateResponse } from '../model/negotiate-response';
import { CommonModel } from '../model/common-model';


@Injectable({
    providedIn: 'root'
})
export class KyberService {

    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        private http: HttpClient
    ) { }

    sayHelloService(): Observable<string> {
        return this.http.get<string>(HELLO_KYBER, { responseType: 'text' as 'json' })
            .pipe(
                tap(_ => {
                    this.log('say hello');
                }),
                catchError(this.handleError<string>('KyberService: Say Hello', ''))
            );
    }

    negotiate(): Observable<NegotiateResponse> {
        return this.http.get<NegotiateResponse>(NEGOTIATE_KYBER)
            .pipe(
                tap(_ => {
                    this.log('negotiating SCIM token');
                }),
                // tslint:disable-next-line: max-line-length
                catchError(this.handleError<NegotiateResponse>('KyberService: Negotiate', { access_token: '', expires_in: 0, token_type: '', id_token: '', scope: [] }))
            );
    }

    sendPublicKey(publicArmored: string): Observable<string> {
        const commonModel: CommonModel = JSON.parse(localStorage.getItem('commonModel'));
        const body = {
            userId: commonModel.userToken.id,
            instrumentId: null,
            pubKey: publicArmored
        };
        return this.http.post<any>(SEND_PUBKEY_KYBER, body, this.httpOptions)
            .pipe(
                tap(_ => {
                    this.log('sending PUB Key');
                }),
                catchError(this.handleError<any>(null))
            );
    }

    /** Log a HeroService message with the MessageService */
    private log(message: string) {
        console.log(`KyberService: ${message}`);
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
