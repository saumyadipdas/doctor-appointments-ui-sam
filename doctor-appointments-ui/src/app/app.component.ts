import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './_models/user';
import { HttpServiceService } from './_services/http-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: String = localStorage.getItem("loggedInUser");


  appointmentstatusDropdown: any = ["NEW", "PENDING", "CONFIRMED", "IN_PROGRESS", "CLOSED", "REJECTED"];
  UserTypesDropdown: any = ["DOCTOR", "ASSISTANT"];



    constructor(
        private router: Router, private _httpClient: HttpClient, 
        private httpService: HttpServiceService,
    //     private authenticationService: AuthenticationService
    ) {
    //     this.authenticationService.currentUser.subscribe(x => this.currentUser = x);


      localStorage.setItem("appointmentstatusDropdown", JSON.stringify(this.appointmentstatusDropdown));
      localStorage.setItem("UserTypesDropdown", JSON.stringify(this.UserTypesDropdown));


      this.httpService.getDoctorList().subscribe((data: any)=>{
        var doctorListDropdownData = [{}];
        for (var obj in data) {
          let arrObj = data[obj];
          for (var key in arrObj) {
            var attrKey = arrObj[key].userId;
            ;
            var attrValue = arrObj[key].userName;
          }
          let tempJson = { "key": attrKey, "value": attrValue };
          doctorListDropdownData.push(tempJson);
        }
        console.log("doctorList: "+JSON.stringify(doctorListDropdownData));
        localStorage.setItem("doctorListDropdown", JSON.stringify(doctorListDropdownData));
      }) 

     }



     // this.vesselDataService.getCountries().subscribe((data: any)=>{
    //   console.log("countryList: "+JSON.stringify(data));
    //   this.localStorageService.setItem("countryList", JSON.stringify(data));
    // }) 


    logout() {
        //this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
