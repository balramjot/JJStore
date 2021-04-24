import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MainServiceService } from './../../core/shared/service/main-service.service';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  /**
   * constructor
   * @param http
   * @param mainService 
   */
  constructor(private http: HttpClient, private mainService: MainServiceService) { }

  /**
   * sign in administrator
   * @param formData is the HTML form values
   */
  loginAdmin(formData: any){
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post("http://localhost:3000/administrator/adminLogin_db",formData, httpOptions);
  }
}
