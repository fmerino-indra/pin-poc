import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { AbstractHttpService } from '../abstract-http.service';

import { HELLO_REMINDER, PIN_REMINDER } from '../constants/constants';

import { PinReminderResponse } from '../model/pin-reminder-response';
@Injectable({
    providedIn: 'root'
})
export class PinReminderService extends AbstractHttpService {

    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor( private http: HttpClient ) {
        super();
    }

    pinSayHelloService(): Observable<string> {
        return this.http.get<string>(HELLO_REMINDER, { responseType: 'text' as 'json' })
            .pipe(
                tap(_ => {
                    this.log('Say hello');
                }),
                catchError(this.handleError<string>('PinReminderService: Say hello', ''))
            );
    }

    pinRequestZPKa(): Observable<PinReminderResponse> {
        return this.http.get<PinReminderResponse>(PIN_REMINDER)
            .pipe(
                tap(_ => {
                    this.log('ZPKa Request');
                }),
                catchError(this.handleError<PinReminderResponse>('PinReminderService: ZPKa Request', new PinReminderResponse()))
            );
    }

    /** Log a HeroService message with the MessageService */
    // private log(message: string) {
    //     console.log( `${this.className} : ${message}`);
    // }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    // private handleError<T>(operation = 'operation', result?: T) {
    //     return (error: any): Observable<T> => {

    //         // TODO: send the error to remote logging infrastructure
    //         console.error(error); // log to console instead

    //         // TODO: better job of transforming error for user consumption
    //         this.log(`${operation} failed: ${error.message}`);

    //         // Let the app keep running by returning an empty result.
    //         return of(result as T);
    //     };
    // }


}
