import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  retryCount = 3;

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const modReq = req.clone({
      setHeaders: { Authorization: `Bearer ${environment.dbToken}` }
    });

    return next.handle(modReq).pipe(
      retry(this.retryCount)
    );
  }
}
