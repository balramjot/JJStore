import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';
import { MainServiceService } from './../../../../core/shared/service/main-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  /**
   * declaring variables
   */
  private querySubscription;
  private subs = new SubSink;
  
  /**
   * constructor
   * @param route 
   * @param service 
   */
  constructor(private route: Router, private service: MainServiceService) { }

  /**
   * log out admin from the application by destroying session
   * and then navigate to login page
   * @param event 
   */
  adminLogOut(event){
    window.sessionStorage.removeItem('administratorToken');
    this.route.navigate(['/login']);    
  }

  /**
   * check if session value altered by user or not in session storage of the browser
   */
  ngOnInit(): void {
    this.querySubscription = this.service.checkSession().subscribe(
      (res) => {
    },
    (error) => {
      window.sessionStorage.removeItem('administratorToken');
      this.route.navigate(['/login']);
    },
    () => {
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
