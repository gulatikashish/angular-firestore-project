import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { MDBBootstrapModule } from 'angular-bootstrap-md'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppComponent } from './app.component'
import { RegisterComponent } from './components/register/register.component'
import { routing } from './app.routing'
import { AngularFireModule } from 'angularfire2'
import { AngularFirestoreModule } from 'angularfire2/firestore'
import { environment } from '../environments/environment'
import { LoginComponent } from './components/login/login.component'
import { UserService } from '../app/store/user/user.services'
import { AngularFireAuthModule } from 'angularfire2/auth'
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { reducers, INITIAL_APPLICATION_STATE } from './store'
import { StoreModule } from '@ngrx/store'
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store'
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { CanActivateDashboard, CanActivateHome } from './services/authGaurd.service'

@NgModule({
  declarations: [AppComponent, RegisterComponent, LoginComponent, DashboardComponent],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    routing,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    StoreModule.forRoot(reducers, { initialState: INITIAL_APPLICATION_STATE }),
    StoreRouterConnectingModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [UserService, CanActivateDashboard, CanActivateHome],
  bootstrap: [AppComponent]
})
export class AppModule {}
