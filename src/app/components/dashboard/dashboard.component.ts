import { Component, OnInit } from '@angular/core'
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore'
import { UserService } from '../../store/user/user.services'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  prodname: string
  proddesc: string
  prodcollection: AngularFirestoreCollection<any> = this.afs.collection('products')
  prodobs = this.prodcollection.valueChanges()
  constructor(private afs: AngularFirestore, private userService: UserService) {}
  add() {
    console.log('===', this.prodname)
    this.prodcollection
      .add({
        prodname: this.prodname,
        proddesc: this.proddesc
      })
      .then(docref => {
        this.prodcollection.doc(docref.id).update({
          prodid: docref.id
        })
      })
      .catch(error => {
        console.log('err', error)
      })
  }
  update(product) {
    this.prodcollection
      .doc(product.prodid)
      .update({
        prodname: product.prodname,
        proddesc: product.proddesc
      })
      .then(() => {
        console.log('up')
      })
  }
  delete(product) {
    this.prodcollection
      .doc(product.prodid)
      .delete()
      .then(() => {
        console.log('deleted')
      })
  }
  logout() {
    this.userService.logout()
  }
  ngOnInit() {}
}
