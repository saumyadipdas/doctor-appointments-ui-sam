import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private httpClient: HttpClient) { }

  /** Important! */
  API_BASE_URL = "http://localhost:8080/";

  
  LOGIN_CHECK = this.API_BASE_URL + "login";
  CREATE_NEW_USER = this.API_BASE_URL + "new-user";
  CREATE_NEW_APPOINTMENT = this.API_BASE_URL + "create-appointment";
  UPDATE_APPOINTMENT = this.API_BASE_URL + "update-appointment";
  VIEW_APPOINTMENTS_BY_DOCTOR = this.API_BASE_URL + "view-appointments";
  VIEW_APPOINTMENTS_BY_DOCTOR_AND_DATE = this.API_BASE_URL + "view-appointments-by-doctor-and-date";
  DELETE_APPOINTMENT = this.API_BASE_URL + "delete-appointment";
  DOCTOR_LISTS_STORE = this.API_BASE_URL + "get-doctors-list";


  public getDoctorList() {
    return this.httpClient.get(this.DOCTOR_LISTS_STORE);
  }

  
}
