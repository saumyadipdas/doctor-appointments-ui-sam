import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
//import { NgxSpinnerService } from 'ngx-spinner';
import { User } from '../_models/user';
import { HttpServiceService } from '../_services/http-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(//private spinner: NgxSpinnerService,
    private httpService: HttpServiceService, private _httpClient: HttpClient) { }

  username: string;
  password: string;

  ngOnInit(): void {
    localStorage.removeItem("loggedInUser");
  }

  login(): void {
    let authCheckurl = this.httpService.LOGIN_CHECK+"?username="+this.username+"&password="+this.password;
      this._httpClient.get(authCheckurl).subscribe(
        {
        next: (data: any) => {
          //this.showSpinner();
          console.log("===== getVesselSearchResultsForMatTable====> " + data);
          localStorage.setItem("loggedInUser",this.username);
          localStorage.setItem("loggedInUserId",data.userId);
          //this.stopSpinner();
          return data;
        },
        error: errorResponse => {
          /** 
           * Receives 'HttpResponseBase' from the server
           * param: errorResponse
           */
          //this.showSpinner();
          console.log(errorResponse);
          //Capture the 'error msg' from the 'error' reposne
          console.log(errorResponse.statusText);

          console.error('There is an error:', errorResponse.statusText + ", error status: " + errorResponse.status);
          //this.stopSpinner();
        }

      });
  }

        
  /********** 
   * 
   * For Spinner
   * 
   **********/
  //  showSpinner() {
  //   this.spinner.show(undefined,
  //     {
  //       type: 'square-spin',
  //       size: 'medium',
  //       bdColor: 'rgba(100,149,237, .8)',
  //       color: 'white',
  //       fullScreen: false
  //     }
  //   );
  
  //   //setTimeout(() => this.spinner.hide(), 5000);
  // }
  
  // stopSpinner() {
  //   this.spinner.hide();
  // }

  

}
