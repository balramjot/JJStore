import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MainServiceService } from './main-service.service';

@Injectable({
  providedIn: 'root'
})
export class notAuthGuard implements CanActivate {

constructor(private route: Router, private mainService: MainServiceService) { }

/**
 * if user not logged in then
 * redirect to login page
 */
canActivate(): boolean {
  if (this.mainService.loggedIn()) {
    this.route.navigate(['/dashboard'])
    return false
} else {
    return true
}
}

}
