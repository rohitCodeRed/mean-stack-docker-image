import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LoginService } from '../login.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent implements OnInit{
  model: any = {};
    loading = false;
    returnUrl: string="";

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: LoginService,
        private alertService: AlertService) { }

    ngOnInit() {

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        // this.authenticationService.login(this.model.username, this.model.password)
        // .pipe(first())
        //     .subscribe(
        //         user => {
        //             if (user && user.token) {
        //                     // store user details and jwt token in local storage to keep user logged in between page refreshes
        //                     this.loading = false;
        //                     localStorage.setItem('currentUser', JSON.stringify(user));
        //                     this.router.navigate([this.returnUrl]);
                            
        //                 }else{
        //                     this.alertService.error("Invalid user password or username");
        //                     this.loading = false;
        //                 }
                    
        //         },
        //         error=>{
        //             console.log("On Login",error);
        //             this.alertService.error(error.error);
        //             this.loading = false;
        //         });

        this.authenticationService.login(this.model.username, this.model.password)
        .subscribe(
            {
                next: (user) => {
                    if (user && user.token) {
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        this.loading = false;
                        localStorage.setItem('currentUser', JSON.stringify(user));
                        this.router.navigate([this.returnUrl]);
                        
                    }else{
                        this.alertService.error("Invalid user password or username");
                        this.loading = false;
                    }
                },
                error: (error) => {
                    //console.log("On Login",error);
                    this.alertService.error(error.message);
                    this.loading = false;
                },
                complete: () => console.info('complete') 
            }
        );
    }

}
