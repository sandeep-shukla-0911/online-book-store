import { Injectable } from '@angular/core';
import { BOOK_STORE_GLOBAL_CONSTANTS } from '@app/_shared/constants';
import { SeverityTypes } from '@app/_shared/enums';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  public appInsights: any;
  constructor() {}
  public initializeApplicationInsightsLog(): void {
    // Configure and load Application Insights
  }

  public logInformationalException(error: Error): void {
    this.appInsights.trackException({
      exception: error,
      severityLevel: SeverityTypes.Information,
      properties: { ApplicationName: BOOK_STORE_GLOBAL_CONSTANTS.APPLICATION_NAME },
    });
  }
  public logWarningException(error: Error): void {
    this.appInsights.trackException({
      exception: error,
      severityLevel: SeverityTypes.Warning,
      properties: { ApplicationName: BOOK_STORE_GLOBAL_CONSTANTS.APPLICATION_NAME },
    });
  }

  public logErrorException(error: Error): void {
    console.log('Error', {
        exception: error,
        severityLevel: SeverityTypes.Error,
        properties: { ApplicationName: BOOK_STORE_GLOBAL_CONSTANTS.APPLICATION_NAME },
      })
    this.appInsights.trackException({
      exception: error,
      severityLevel: SeverityTypes.Error,
      properties: { ApplicationName: BOOK_STORE_GLOBAL_CONSTANTS.APPLICATION_NAME },
    });
  }

  public logCriticalException(error: Error): void {
    this.appInsights.trackException({
      exception: error,
      severityLevel: SeverityTypes.Critical,
      properties: { ApplicationName: BOOK_STORE_GLOBAL_CONSTANTS.APPLICATION_NAME },
    });
  }

  public logTrace(traceMessage: string): void {
    this.appInsights.trackTrace({
      message: traceMessage,
      properties: { ApplicationName: BOOK_STORE_GLOBAL_CONSTANTS.APPLICATION_NAME },
    });
  }
}
