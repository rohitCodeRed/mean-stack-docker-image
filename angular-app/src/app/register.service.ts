import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
//import { Observable } from 'rxjs';
//import 'rxjs/add/operator/map';
import { environment } from '../environments/environment';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  registerUrl: string = environment.serverUrl + '/api/user/register';
  constructor(private http: HttpClient) { }

  register(data: any) {
      return this.http.post<any>(this.registerUrl, data).pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error(`Status code ${error.status}, ${error.error}`));
  }
}
