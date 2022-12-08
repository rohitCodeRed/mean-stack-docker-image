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
                data => {
                    // set success message and pass true paramater to persist the message after redirecting to the login page
                    this.alertService.success('Registration successful', true);
                    this.loading = false;
                    this.router.navigate(['login']);
                });
    }
}
