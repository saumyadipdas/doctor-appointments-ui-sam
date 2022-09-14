import { Component, OnInit } from '@angular/core';
//import { NgxSpinnerService } from 'ngx-spinner';


import { SelectionModel } from '@angular/cdk/collections';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Appointment } from '../_models/appointment';
import { HttpServiceService } from '../_services/http-service.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-view-appointments',
  templateUrl: './view-appointments.component.html',
  styleUrls: ['./view-appointments.component.css']
})
export class ViewAppointmentsComponent implements OnInit {

  //private spinner: NgxSpinnerService,
  constructor(
    private httpService: HttpServiceService, private _httpClient: HttpClient) { }

    //Localstorage of the Doctor Id

    //Server Error Message
  serverErrorMessage: string = null;

    /***** For Pagination ****/
    resultsLength = 0;
    isLoadingResults = false;
    isRateLimitReached = false;

    /********Custom Paginations **************/
    currentPage = 1;
    totalRecords = 100;
    recordsPerPage = 10;
    startIndex = 1;
    endIndex = this.startIndex + this.recordsPerPage - 1;
    disablePrevPageBtn: boolean = false;
    disableNextPageBtn: boolean = false;

      /*** For Mat Table */
      appointmentSearchResultListsDataSource!: MatTableDataSource<Appointment>;//Don't comment! @Sam

  ngOnInit(): void {
    this.currentPage = 1;
    this.startIndex = 1;
    this.endIndex = this.startIndex + this.recordsPerPage - 1;
    this.getAppointmentSearchResultsForMatTable( this.currentPage, this.recordsPerPage);
  }





    /************************************************************************************************
  * Calls the Search Result API for MAT Table
  * @START
  ************************************************************************************************/
     getAppointmentSearchResultsForMatTable(pageToBeFetched: number, recordsPerPage: number) {
      //this.vesselDataService.getVesselSearchResults(this.vesselSearchModel, pageToBeFetched, this.paginator.pageSize).subscribe((data: any) => {
  
      // this.vesselDataService.getVesselSearchResults(searchModel, activeSearchModule, pageToBeFetched, recordsPerPage).subscribe((data: any) => {
      //   this.showSpinner();
      //   console.log("===== getVesselSearchResultsForMatTable====> " + data);
      //   this.searchResultListsDataSource = new MatTableDataSource(data); // on data receive populate dataSource.data array
      //   this.stopSpinner();
      //   return data;
      // });
      let searchResultsUrl = this.httpService.VIEW_APPOINTMENTS_BY_DOCTOR+"?responsibleDoctorId="+localStorage.getItem("loggedInUserId");
      this._httpClient.get<Appointment[]>(searchResultsUrl).subscribe(
        {
          next: data => {
            //this.showSpinner();
            console.log("===== getVesselSearchResultsForMatTable====> " + data);
            this.appointmentSearchResultListsDataSource = new MatTableDataSource(data); // on data receive populate dataSource.data array
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
            this.serverErrorMessage = "Unable to fetch due to the server error. \nError: " + errorResponse.statusText + "."
            this.serverErrorMessage += "\nPlease verify if the server health is good and running!";
  
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
