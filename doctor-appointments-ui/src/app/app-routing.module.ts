import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateAppointmentComponent } from './create-appointment/create-appointment.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ViewAppointmentsComponent } from './view-appointments/view-appointments.component';
import { AuthguardService } from './_services/authguard.service';


const routes: Routes = [
  { path: '', component: ViewAppointmentsComponent, canActivate: [AuthguardService] },
  // { path: 'home', component: HomeComponent, canActivate: [AuthguardService] },
  { path: 'login', component: LoginComponent },
  { path: 'view-appointments', component: ViewAppointmentsComponent, canActivate: [AuthguardService] },
  { path: 'create-appointments', component: CreateAppointmentComponent, canActivate: [AuthguardService] },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }

  //{ path: '**', component: LoginComponent } //This path is how Angular identifies a wildcard route. Any route that does not match an existing route in your configuration will use this route.

];

//export const appRoutingModule = RouterModule.forRoot(routes);
// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }


@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      //{ enableTracing: true, useHash: false }, // <-- debugging purposes only
      //{ enableTracing: true }, // <-- debugging purposes only
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }