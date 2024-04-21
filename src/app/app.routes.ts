import { Routes } from '@angular/router';
import { MainComponent } from './shared/components/main/main.component';
import { BookDetailComponent } from './features/book/pages/book-detail/book-detail.component';
import { PenaltyComponent } from './features/penalty/pages/penalty/penalty.component'; //penalty
import { MaterialListComponent } from './shared/components/material-list/material-list.component';
import { PenaltyAdminComponent } from './features/penalty/pages/penalty-admin/penalty-admin.component'; //penalty-admin
import { ActivityComponent } from './features/activity/pages/activity/activity.component';//activity
import { LoginComponent } from './shared/components/authentication/login/login.component';
import { RegisterComponent } from './shared/components/authentication/register/register.component';
import { ForgotPasswordComponent } from './shared/components/authentication/forgot-password/forgot-password.component';
import { NewPasswordComponent } from './shared/components/authentication/new-password/new-password.component';
import { NotfoundComponent } from './shared/components/notfound/notfound.component';



export const routes: Routes = [
    { path: '', component: MainComponent },
    { path: 'book-detail', component: BookDetailComponent },
    { path: 'penalty', component: PenaltyComponent }, //penalty
    { path: 'material-list', component: MaterialListComponent },
    { path: 'penalty-admin', component: PenaltyAdminComponent }, //penalty-admin
    { path: 'activity', component: ActivityComponent }, //activity
    { path: 'login',component:LoginComponent},
    { path: 'register',component:RegisterComponent},
    { path:'forgot-password',component:ForgotPasswordComponent},
    { path:'new-password',component:NewPasswordComponent},
    { path: '**', component: NotfoundComponent }


];
