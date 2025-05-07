import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, Observable, throwError } from 'rxjs';
import {
  showErrorMessage,
  showWarningMessage,
} from '../../utils/message.utils';
import { SessionStorageService } from '@core/services/security/session-storage.service';
import { UserService } from '@core/services/security/user.service';

@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {
  constructor(
    private readonly _storageService: SessionStorageService,
    private readonly _messageService: MessageService,
    private readonly _userService: UserService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this._storageService.hasDsiTkn() && this._storageService.hasProfile()) {
      const token = this._storageService.getDsiTkn();
      const profile = this._storageService.getProfile();

      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token,
          PRF: `${profile}`,
        },
      });
    }
    return next.handle(req).pipe(
      catchError((httpErrorResponse: HttpErrorResponse) => {
        const status = httpErrorResponse.status;
        const errors = httpErrorResponse.error?.messages;

        if (status === 400) {
          if (errors instanceof Array) {
            const arrayErrors = [...new Set(errors)];
            arrayErrors.forEach((error) => {
              showWarningMessage(this._messageService, error);
            });
          } else {
            showWarningMessage(this._messageService, errors.message);
          }
        } else if (status === 401) {
          showErrorMessage(this._messageService, 'Authentication failed.');
        } else if (status === 403) {
          this._userService.logout();
          if (!this._userService.isLoggingOut) {
            this._userService.isLoggingOut = true;
            showErrorMessage(
              this._messageService,
              'We have to disconnect you for security problems, please do login again.'
            );
            setTimeout(() => {
              this._userService.isLoggingOut = false;
            }, 5000);
          }
        } else {
          if (!this._userService.isLoggingOut) {
            this._userService.isLoggingOut = true;
            showErrorMessage(
              this._messageService,
              `An unexpected error has been encountered, please check with administrator.`
            );
            setTimeout(() => {
              this._userService.isLoggingOut = false;
            }, 5000);
          }
        }

        return throwError(httpErrorResponse);
      })
    );
  }
}
