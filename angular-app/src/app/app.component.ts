import { Component } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';
import {Router, NavigationStart, ActivatedRoute} from '@angular/router';
import { LoginService } from './login.service';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  currentUserLogin: boolean = false;
  panelOpenState: boolean = false;
  buttonOption:boolean = true;
  email:string="";
  nickName:string="";

  constructor(private alertService: AlertService,private authenticationService: LoginService ,private router:Router, private activatedRoute: ActivatedRoute,iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    //localStorage.setItem('currentUser',"{}");
    
    iconRegistry.addSvgIcon(
        'menu',
        sanitizer.bypassSecurityTrustResourceUrl('assets/menu.svg'));

      iconRegistry.addSvgIcon(
          'multi_chart',
          sanitizer.bypassSecurityTrustResourceUrl('assets/multi_chart.svg'));

      iconRegistry.addSvgIcon(
              'home',
              sanitizer.bypassSecurityTrustResourceUrl('assets/home.svg'));

    }

    ngOnInit() {

        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
              const currUser = localStorage.getItem('currentUser');
              
              if(localStorage.getItem('currentUser')){
                this.currentUserLogin = true;
                let curentUser={"username":"","nickname":""};
                curentUser = currUser ? JSON.parse(currUser) : [];
                // if(localStorage.getItem('currentUser')){
                //   curentUser = JSON.parse(localStorage.getItem('currentUser'));
                  
                // }
                //let curentUser = JSON.parse(localStorage.getItem('currentUser'));
                this.email= curentUser.username;
                this.nickName = curentUser.nickname;
              }
              else{
                this.currentUserLogin = false;
              }
            }
          });
        }

      logedOut(){
        this.authenticationService.logout().subscribe(
          {
            next: (data) => {
              localStorage.removeItem('currentUser');
              this.router.navigate(['login']);
            },
            error: (error) => {
                //console.log("On Login",error);
                localStorage.removeItem('currentUser');
                this.router.navigate(['login']);
            },
            complete: () => console.info('complete') 
        });
            
      }

}
