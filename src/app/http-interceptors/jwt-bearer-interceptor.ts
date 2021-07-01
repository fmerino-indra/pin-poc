import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

import { CommonModel } from '../model/common-model';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class JwtBearerInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    const started = Date.now();
    let ok: string;
    let request = req;
    const commonModel: CommonModel = JSON.parse(localStorage.getItem('commonModel'));
    let token: string;

    console.log('Intercepting:' + req.url);
    // Diferentes tokens para diferentes servicios
    if (req.url.match(/pin/)) {
        token = commonModel.negotiateResponse.id_token;
    } else if (req.url.match(/kyber/)) {
        token = commonModel.userToken.token;
    } else {
        next.handle(req);
    }

    if (token) {
        request = req.clone({
            setHeaders: {
                authorization: `Bearer ${ token }`
            }
        });
    }

    // extend server response observable with logging
    return next.handle(request)
    .pipe(
        tap(
          // Succeeds when there is a response; ignore other events
          event => ok = event instanceof HttpResponse ? 'succeeded' : '',
          // Operation failed; error is an HttpErrorResponse
          error => ok = 'failed'
        ),
        // Log when response observable either completes or errors
        finalize(() => {
          const elapsed = Date.now() - started;
          const msg = `${req.method} "${req.urlWithParams}"
             ${ok} in ${elapsed} ms.`;
          this.log(msg);
        })
    );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log('Message:', message);
  }

  private samlFlow() {

  }
}
