import { Routes } from '@angular/router';
import { MainComponent } from './shared/components/main/main.component';
import { BookDetailComponent } from './features/book/pages/book-detail/book-detail.component';
import { PenaltyComponent } from './features/penalty/pages/penalty/penalty.component'; //penalty
import { MaterialListComponent } from './shared/components/material-list/material-list.component';
import { PenaltyAdminComponent } from './features/penalty/pages/penalty-admin/penalty-admin.component'; //penalty-admin
import { ActivityComponent } from './features/activity/pages/activity/activity.component';//activity
import { HelpComponent } from './features/help/pages/help/help.component';//help
import { EditProfileComponent } from './features/edit-profile/pages/edit-profile/edit-profile.component'
import { MyBooksComponent } from './features/my-books/pages/my-books/my-books.component'
import { EditUsersComponent } from './features/edit-users/pages/edit-users/edit-users.component'
import { NotfoundComponent } from './shared/components/notfound/notfound.component';

import { LoginComponent } from './shared/components/authentication/login/login.component';
import { RegisterComponent } from './shared/components/authentication/register/register.component';
import { roleGuard } from './guards/role.guard';
import { MaterialDetailComponent } from './shared/components/material-detail/material-detail.component';




export const routes: Routes = 
    { path: '', component: MainComponent,  canActivate:[roleGuard],data:{requiredRoles:["Admin"]}},
    { path: 'book-detail', component: BookDetailComponent },
    { path: '', component: MainComponent },
    { path: 'material-detail', component: MaterialDetailComponent },
    { path: 'penalty', component: PenaltyComponent }, //penalty
    { path: 'material-list', component: MaterialListComponent },
    { path: 'penalty-admin', component: PenaltyAdminComponent }, //penalty-admin
    { path: 'activity', component: ActivityComponent }, //activity
    { path: 'help', component: HelpComponent },//help
    { path: 'edit-profile', component: EditProfileComponent },
    { path: 'My-Material', component: MyBooksComponent },
    { path: 'edit-user', component: EditUsersComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '**', component: NotfoundComponent },

];
