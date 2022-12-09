import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService} from '../alert.service';
import { RegisterService } from '../register.service';


@Component({
  selector: 'app-registration-screen',
  templateUrl: './registration-screen.component.html',
  styleUrls: ['./registration-screen.component.css']
})
export class RegistrationScreenComponent {
  model: any = {};
    loading = false;


    constructor(
        private router: Router,
        private alertService: AlertService,
        private registerService: RegisterService ) { }

    register() {
        this.loading = true;
        this.registerService.register(this.model)
        .subscribe(
              {
                  next: (data) => {
                    this.alertService.success('Registration successful', true);
                    this.loading = false;
                    this.router.navigate(['login']);
                  },
                  error: (error) => {
                      //console.log("On Registration",error);
                      this.alertService.error(error.message);
                      this.loading = false;
                  },
                  complete: () => console.info('complete') 
              }
          );
    }
}
