import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MainServiceService } from './main-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

constructor(private route: Router, private mainService: MainServiceService) { }

/**
 * if user already logged in then
 * donot allow to redirect to without loggin pages
 */
canActivate(): boolean {
  if(this.mainService.loggedIn()) {
    return true;
  } else {
    this.route.navigate(['/login']);
    return false;
}
}

}
