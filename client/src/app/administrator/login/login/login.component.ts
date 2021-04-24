import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SubSink } from 'subsink';
import { LoginServiceService } from './../login-service.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy  {

  /**
   * variables
   */
  private querySubscription;
  private subs = new SubSink;

  adminLoginForm: FormGroup;
  error: boolean = false;
  dataLoading: boolean = false;
  success: boolean = false;
  errorMessage : String = '';

  /**
   * constructor
   * @param route 
   * @param fb 
   * @param service 
   */
  constructor(private route: Router, private fb: FormBuilder, private service: LoginServiceService) { }

  /**
   * initializing form values on page load
   */
  ngOnInit(): void {
    this.adminLoginForm = this.fb.group({
      username : [null, Validators.required],
      password: [null, Validators.required]
    });
  }
  
  /**
   * sign in administrator
   * @param formData 
   */
  adminLogin(formData: any) {
    this.dataLoading = true;
    this.querySubscription = this.service.loginAdmin(formData).subscribe(
      (res) => {
        if (res['Code'] > 0)                                                                          // no error found
        {
          this.error = false;
          this.errorMessage = res['Message'];                                                         // message to display
          this.dataLoading = false;                                                                   // data loader set to off
          this.success = true;                                                                        // showing sucess to change class
          this.adminLoginForm.reset();                                                                   // resetting the form
          
          window.sessionStorage.setItem('administratorToken', res['data'].token);
          // console.log(res['data'].token);

          // let decoded = jwt_decode(res['data'].token);
          // console.log(decoded);
          
          // resetting validation errors
          this.adminLoginForm.controls.username.setErrors(null);                      
          this.adminLoginForm.controls.password.setErrors(null);
          this.route.navigate(['/dashboard']);
        }
        else                                                                                            // in case of error from query
        {
          this.error = true;
          this.success = false;
          this.errorMessage = res['Message'];
          this.dataLoading = false;
        }
      },
      (error) => {
        this.error = true;
        this.success = false;
        this.errorMessage = error.message;
        this.dataLoading = false;
      },
      () => {
        this.dataLoading = false;
      }
    );
  }

  /**
   * unsubscribing all the services after their use
   */
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
