import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, Form } from '@angular/forms';
import { Appointment } from '../_models/appointment';
import { HttpServiceService } from '../_services/http-service.service';
//import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.css']
})
export class CreateAppointmentComponent implements OnInit {

  appointmentstatusDropdown = JSON.parse(localStorage.getItem("appointmentstatusDropdown") || '{}');
  doctorListDropdown = JSON.parse(localStorage.getItem("doctorListDropdown") || '{}');

  //Contains the array of the errors after validating the special conditions.
  specialValidationErrors: Array<String> = [];

  //Error messages from Server
  serverErrorMessage: string = null;
  //Error messages from Server
  serverSuccessMessage: string = null;

  //Keeps track when save button is clicked
  saveButtonClickedSuccessMsg: Boolean = false;



  @ViewChild('createAppointmentForm', { static: true }) public formName!: NgForm;
  appointmentModelObj = new Appointment(null, null, null, null, null, null);

  //private spinner: NgxSpinnerService,
  constructor(
    private httpService: HttpServiceService, private _httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  submitAppointmentData(){
    //this.showSpinner();

    console.log("***************************************************************");
    console.log("*************** In Final SAVE ***********************");
    console.log("this.appointmentModelObj=> " + JSON.stringify(this.appointmentModelObj));
    console.log("***************************************************************");
    
    //Work around to manually override the 'specialValidationErrors' array.
    this.specialValidationErrors = [];

    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(this.appointmentModelObj);
    const that = this;
    let url = this.httpService.CREATE_NEW_APPOINTMENT;
    this._httpClient.post(url,
      body, { 'headers': headers })
      .subscribe(
        {
          next: data => {
            console.log(data);
            this.serverErrorMessage = null;
            this.showSuccessMessage();
            //this.stopSpinner();
          },
          error: errorResponse => {
            /** 
             * Receives 'HttpResponseBase' from the server
             * param: errorResponse
             */
            //Work-around! Why error object? @Sam
            if (errorResponse.status == '200') {
              this.serverErrorMessage = null;
              this.serverSuccessMessage = errorResponse.error.text;
              this.showSuccessMessage();
              //this.stopSpinner();
            } else {

              //Hide the success message!
              this.saveButtonClickedSuccessMsg = false;
              this.serverSuccessMessage = null;
              //Capture the 'error msg' from the 'error' reposne
              this.serverErrorMessage = errorResponse.error;
              //this.errorMessage = error.message;
              console.error('There was an error!', errorResponse.error + ", error status: " + errorResponse.status);
              //this.stopSpinner();
            }
          }
        });
  }

/**
   * Shows Success Messages for 3 seconds on SUCCESSFUL SAVE.
   */
 showSuccessMessage() {
  var that = this;
  //Depicts that SAVE button is clicked.
  //Shows success message
  this.saveButtonClickedSuccessMsg = true;

  //Is this timeout thing really required? @Sam
  // setTimeout(function () {
  //   that.saveButtonClickedSuccessMsg = false;
  // }, 7000);
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


  cancelAppointmentData(){

  }

}
