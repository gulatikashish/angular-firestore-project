import { Injectable } from '@angular/core'
import { Router, CanActivate } from '@angular/router'
import { UserService } from '../store/user/user.services'

@Injectable()
export class CanActivateDashboard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}
  canActivate() {
    const isUserLoggedIn = this.userService.isLoggedIn()
    if (!isUserLoggedIn) {
      this.router.navigateByUrl('/')
    }
    return isUserLoggedIn
  }
}

@Injectable()
export class CanActivateHome implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}
  canActivate() {
    const isUserLoggedIn = this.userService.isLoggedIn()
    if (!isUserLoggedIn) {
      this.router.navigateByUrl('/')
    }
    return isUserLoggedIn
  }
}
