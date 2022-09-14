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


    selection = new SelectionModel<Appointment>(true, []);


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






      /**
       * To view the Appointment details
       */
      viewIndividualAppointmentData(rowObj: any){
        console.log(rowObj);
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



  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.appointmentSearchResultListsDataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.appointmentSearchResultListsDataSource.data.forEach(row => this.selection.select(row));
  }

  logSelection() {
    this.selection.selected.forEach(s => console.log(s));
  }




  /******************************************************
   * For Custom Paginations
   * @Start
   * 
   ******************************************************/

  /**
   * On click of Prev Page!
   */
   prevPage() {

    if (this.startIndex > 1) {
      this.endIndex = parseInt(this.startIndex + "") - 1;
      this.startIndex = parseInt(this.endIndex + "") - parseInt(this.recordsPerPage + "") + 1;

      if (this.startIndex >= 1) {
        //this.spinner.show(undefined, { fullScreen: true });
        setTimeout(() => {
          //this.spinner.hide();
          this.disablePrevPageBtn = false;
          this.disableNextPageBtn = false;
          this.currentPage = parseInt(this.currentPage + "") - 1;
          this.getAppointmentSearchResultsForMatTable(this.currentPage, this.recordsPerPage);
        }, 700);
      }
      else {
        this.disablePrevPageBtn = true;
      }
    }
  }


  /**
   * On click of Next Page!
   */
  nextPage() {

    if (this.endIndex < this.totalRecords) {
      this.startIndex = parseInt(this.endIndex + "") + 1;
      this.endIndex = parseInt(this.endIndex + "") + parseInt(this.recordsPerPage + "");

      if (this.endIndex < this.totalRecords) {

        //this.spinner.show(undefined, { fullScreen: true });
        setTimeout(() => {
          //this.spinner.hide();
          this.disablePrevPageBtn = false;
          this.disableNextPageBtn = false;
          this.currentPage = parseInt(this.currentPage + "") + 1;
          this.getAppointmentSearchResultsForMatTable(this.currentPage, this.recordsPerPage);
        }, 700);
      }
      else {
        this.disableNextPageBtn = true;
      }
    }
  }



  /**
   * On change event of the 'PageSize' change
   * @param event
   */
  onPageSizeChange() {
    //this.spinner.show(undefined, { fullScreen: true });
    setTimeout(() => {
      //this.spinner.hide();
      this.startIndex = 1;
      this.endIndex = parseInt(this.startIndex + "") + parseInt(this.recordsPerPage + "") - 1;
      this.disablePrevPageBtn = true;
      this.getAppointmentSearchResultsForMatTable( 1, this.recordsPerPage);
    }, 700);
  }


  /******************************************************
   * For Custom Paginations
   * @End
   * 
   ******************************************************/




}
