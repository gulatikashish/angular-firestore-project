import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import * as UserActions from './user.action'
import { Router } from '@angular/router'
import { AngularFireAuth } from 'angularfire2/auth'
import { ApplicationState } from '../index'
import * as firebase from 'firebase'
import { AngularFireDatabase } from 'angularfire2/database'
import { Observable } from 'rxjs/Observable'
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore'
@Injectable()
export class UserService {
  fbUserProfile
  name?: string
  email?: string
  loginId?: string
  userCollection: AngularFirestoreCollection<any> = this.afs.collection('users')
  constructor(
    private store: Store<ApplicationState>,
    private fbAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private afs: AngularFirestore,
    private router: Router
  ) {}

  signUp(signUpData) {
    console.log('=', signUpData)
    return new Promise((resolve, reject) => {
      this.fbAuth.auth
        .createUserWithEmailAndPassword(signUpData.email, signUpData.password)
        .then(fbUser => {
          console.log('------------', fbUser.uid)
          this.register(fbUser.uid, signUpData)
        })
        .catch(err => {
          console.log('=-ERR-=====', err)
          reject(err)
          // throw err
          // this.store.dispatch(new UserActions.AddUser(err))
        })
    })
  }
  register(id, data) {
    return new Promise((resolve, reject) => {
      console.log('==========', id, data)
      this.userCollection
        .add({
          name: data.name,
          email: data.email,
          loginId: id
        })
        .then(docref => {
          this.userCollection.doc(docref.id).update({
            prodid: docref.id
          })
          this.store.dispatch(new UserActions.AddUser({ _id: docref.id, name: data.name, email: data.email }))
          resolve(docref)
        })
        .catch(err => {
          throw err
          // this.store.dispatch(new UserActions.AddUser(err))
        })
    })
  }
  login(userCredential) {
    return new Promise((resolve, reject) => {
      console.log('auth set', userCredential)
      this.fbAuth.auth
        .signInWithEmailAndPassword(userCredential.email, userCredential.password)
        .then(fbUser => {
          console.log('auth set11', fbUser.uid)
          // if (fbUser.emailVerified === false) {
          //   reject({
          //     message: 'Email is not verified.'
          //   })
          // } else {
          //   const userData = {
          //     email: fbUser.email,
          //     uid: fbUser.uid
          //   }
          //   this.store.dispatch(new LoadLoggedInFirebaseUser(userData))
          resolve(fbUser.uid)
          // }
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  // authorSignUp(userCredential, userProfile): Promise<any> {
  //   console.log(userCredential, userProfile)
  //   return this.fbAuth.auth
  //     .createUserWithEmailAndPassword(userCredential.email, userCredential.password)
  //     .then(fbUser => {
  //       this.sendEmailForVerification(fbUser)
  //       this.profilesService.createAuthorProfile(userProfile, fbUser).then(x => {})
  //     })
  // }

  // memberSignUp(userCredential, userProfile): Promise<any> {
  //   return this.fbAuth.auth
  //     .createUserWithEmailAndPassword(userCredential.email, userCredential.password)
  //     .then(fbUser => {
  //       this.sendEmailForVerification(fbUser)
  //       this.profilesService.createMemberProfile(userProfile, fbUser)
  //     })
  // }
  // Send Email for Verification
  // sendEmailForVerification(fbUser) {
  //   // url: 'http://localhost:4200/?email=' + fbUser.email
  //   var redirectUrl = {
  //     url: 'http://localhost:4200/auth/login'
  //   }
  //   fbUser.sendEmailVerification(redirectUrl).then(() => {
  //     console.log('email sent')
  //   })
  //   // this.logOut();
  // }

  // googleLogin() {
  //   const provider = new firebase.auth.GoogleAuthProvider()
  //   return this.oAuthLoginProvider(provider)
  // }

  // facebookLogin() {
  //   const provider = new firebase.auth.FacebookAuthProvider()
  //   return this.oAuthLoginProvider(provider)
  // }

  // twitterLogin() {
  //   const provider = new firebase.auth.TwitterAuthProvider()
  //   return this.oAuthLoginProvider(provider)
  // }

  // private oAuthLoginProvider(provider) {
  //   return this.fbAuth.auth.signInWithPopup(provider).then(credential => {
  //     this.updateUserData(credential.user)
  //   })
  // }

  checkUsername(username) {
    // console.log('do I get called');
    const newusername = username.toLowerCase()
    return this.db.object(`/usernames/${newusername}`)
  }

  updateUsername(username: string) {
    const data = {}
    data[username] = this.fbUserProfile.id

    this.db.object(`/users/${this.fbUserProfile.id}`).update({ username: username })
    this.db.object(`/usernames`).update(data)
  }

  // updateUserData(fbUser) {
  //   return this.profilesService.createMemberProfileWithSocial(fbUser)
  // }

  resetPassword(email: string) {
    const auth = firebase.auth()
    return auth.sendPasswordResetEmail(email)
  }

  // logOut() {
  //   this.fbAuth.auth.signOut().then(() => {
  //     this.store.dispatch(new UserActions.LogOut())
  //     this.router.navigateByUrl('/auth')
  //   })
  // }

  // sendOrgContact(data) {
  //   return this.profilesService.sendOrgContact(data)
  // }
  // setToken(token: string) {
  //   sessionStorage.setItem('token', token)
  // }

  // getToken(): string {
  //   return sessionStorage.getItem('token')
  // }

  setUser(user: object): void {
    sessionStorage.setItem('user', JSON.stringify(user))
  }
  getToken(): string {
    return sessionStorage.getItem('user')
  }
  getUser(): object {
    return JSON.parse(sessionStorage.getItem('user'))
  }

  logout(): void {
    // sessionStorage.removeItem('token')
    sessionStorage.removeItem('user')
    this.router.navigateByUrl('/')
  }
  isLoggedIn(): boolean {
    if (this.getToken()) {
      return true
    } else {
      return false
    }
  }
}

// export interface LoginData {
//   email: string
//   password: string
// }
