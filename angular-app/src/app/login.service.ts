import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginUrl: string = environment.serverUrl + '/api/user/loggedIn';
    logoutUrl:string = environment.serverUrl + '/api/user/loggedOut';
    //_headers =

    constructor(private http: HttpClient) { }

    login(username: string, password: string): Observable<any> {
        return this.http.post<any>(this.loginUrl, { username: username, password: password }).pipe(
          map(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
            }

            return user;
          }),
          catchError(this.handleError)
        );
        
    }

    logout() {
        let curentUser = {"token":""};
        const token = localStorage.getItem('currentUser');
        curentUser = token ? JSON.parse(token) : curentUser;

        let res = 'token '+ curentUser["token"];
        const httpOptions = {headers: new HttpHeaders({'Content-Type':'application/json','Authorization':res})};

        return this.http.get<any>(this.logoutUrl,httpOptions).pipe(
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
