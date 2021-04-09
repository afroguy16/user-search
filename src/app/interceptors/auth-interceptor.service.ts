import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { environment } from '../../environments/environment';

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('Request going...');
    const modifiedRequest = req.clone({ setHeaders: { Authorization: `Bearer ${environment.token}` } });
    return next.handle(modifiedRequest);
  }
}
