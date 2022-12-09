import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LineChartComponent } from './line-chart/line-chart.component';
import { MainViewComponent } from './main-view/main-view.component';
import { GaugeChartComponent } from './gauge-chart/gauge-chart.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { RegistrationScreenComponent } from './registration-screen/registration-screen.component';

const routes: Routes = [
  { path: 'login', component: LoginScreenComponent },
  { path: 'register', component: RegistrationScreenComponent },
  { path: 'overview', component: MainViewComponent ,canActivate: [AuthGuard] },
  { path: '', redirectTo: 'overview', pathMatch: 'full'},
  // { path: 'linechart', component: LineChartComponent,canActivate: [AuthGuard]  },
  // // { path: 'gauge', component: GaugeChartComponent,canActivate: [AuthGuard]  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
