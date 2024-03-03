import {Injectable} from '@angular/core';

import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Distrito} from "../models/distrito";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DistritoService {

  private apiURL = "http://localhost:8080/distrito/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<Distrito[]> {
    return this.httpClient.get<Distrito[]>(this.apiURL)
      .pipe(
        catchError(this.errorHandler));
  }

  create(distrito: Distrito): Observable<Distrito> {
    return this.httpClient.post<Distrito>(this.apiURL, JSON.stringify(distrito), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  find(id: number): Observable<Distrito> {
    return this.httpClient.get<Distrito>(this.apiURL + id)
      .pipe(catchError(this.errorHandler));
  }

  update(id: number, distrito: Distrito): Observable<Distrito> {
    return this.httpClient.put<Distrito>(this.apiURL + id, JSON.stringify(distrito), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  delete(id: number) {
    return this.httpClient.delete<Distrito>(this.apiURL + id, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: any) {

    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(() => errorMessage);
  }
}
