import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {

  /**
   * constructor
   * @param http 
   */
  constructor(private http: HttpClient) { }

  /**
   * get session storage token value
   */
  getToken() {
    return window.sessionStorage.getItem('administratorToken');
  }

  /**
   * check if administrator is logged in or not
   */
  loggedIn(){
    return !!window.sessionStorage.getItem('administratorToken');
  }

  /**
   * check if session value altered by user or not in session storage of the browser
   */
  checkSession() {
    return this.http.get("http://localhost:3000/administrator/checkSesssion");
  }
}
