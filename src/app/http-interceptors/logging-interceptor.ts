import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class SamlFlowInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    const started = Date.now();
    let ok: string;

    debugger;
    // extend server response observable with logging
    return next.handle(req)
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

}