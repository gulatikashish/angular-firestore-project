import { Component, OnInit } from '@angular/core'
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore'
import { Router } from '@angular/router'
import { UserService } from '../../store/user/user.services'
import { error } from '@firebase/database/dist/esm/src/core/util/util'
import swal from 'sweetalert'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(private afs: AngularFirestore, private router: Router, private userService: UserService) {}
  register(data) {
    this.userService
      .signUp(data)
      .then(data => {
        console.log('[[[[[[[[[', data)
      })
      .catch(error => {
        swal(error.message, 'error', 'error')
      })
    this.router.navigateByUrl('/')
  }
  ngOnInit() {}
}
