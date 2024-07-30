import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { throwError } from 'rxjs';
import { LoggerService } from '@app/core/services';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService implements ErrorHandler {
  constructor(private readonly loggerService: LoggerService) {}
  public handleError(error: any): void {
    if (environment.production && !(error instanceof HttpErrorResponse)) {
      this.loggerService.logErrorException(error);
    }
    throwError(() => error);
  }
}
