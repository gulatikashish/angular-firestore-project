import { Component, OnInit } from '@angular/core'
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore'
import {} from '../../../'
import { Router } from '@angular/router'
import { UserService } from '../../store/user/user.services'
import { error } from 'util'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private afs: AngularFirestore, private router: Router, private userService: UserService) {}
  login(data) {
    this.userService
      .login(data)
      .then(data => {
        console.log('data111', data)
        this.userService.setUser(data)
        this.router.navigateByUrl('/dashboard')
      })
      .catch(error => {
        swal(error.message, 'error', 'error')
      })
  }
  logout() {
    this.userService.logout()
  }
  ngOnInit() {}
}
