import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
//import { Observable } from 'rxjs';
//import 'rxjs/add/operator/map';
import { environment } from '../environments/environment';
import { catchError, throwError } from 'rxjs';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  registerUrl: string = environment.serverUrl + '/api/logged/register';
  constructor(private http: HttpClient,private alertService:AlertService) { }

  register(data: any) {
    // ,
    //             error => {
    //                 console.log("On Register",error);
    //                 this.alertService.error(error.error);
    //                 this.loading = false;
    //             }
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
    this.alertService.error(error.message);

    this.alertService.error(error.message);
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
