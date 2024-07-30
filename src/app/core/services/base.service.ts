import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  constructor(public http: HttpClient) {}
  public baseGet<T>(serviceUrl: string): Observable<T> {
    return new Observable<T>(observer => {
      this.http.get<T>(serviceUrl).subscribe({
        next: (response: T) => observer.next(response),
        error: error => observer.error(error),
      });
    });
  }

  public basePut<T>(serviceUrl: string, data: any): Observable<T> {
    return new Observable<T>(observer => {
        this.http.put<T>(serviceUrl, data).subscribe(
            (response: T) => {
                observer.next(response);
            },
            error => {
                observer.error(error);
            }
        );
    });
  }

  public baseDelete<T>(serviceUrl: string, requestBody: any): Observable<T> {
    return new Observable<T>(observer => {
      this.http.delete<T>(serviceUrl, {
        body: requestBody
      }).subscribe({
        next: (response: T) => {
          observer.next(response);
          observer.complete();
        },
        error: error => {
          observer.error(error);
        }
      });
    });
  }

  public basePost<T>(serviceUrl: string, data: any): Observable<T> {
    return new Observable<T>(observer => {
      this.http.post<T>(serviceUrl, data).subscribe(
        (response: T) => {
          observer.next(response);
        },
        error => {
          observer.error(error);
        }
      );
    });
  }
}
