import { authGuard } from './core/guards/auth.guard';
import { Routes } from '@angular/router';
import { MainComponent } from './shared/components/main/main.component';
import { PenaltyComponent } from './features/penalty/pages/penalty/penalty.component'; //penalty
import { MaterialListComponent } from './shared/components/material-list/material-list.component';
import { PenaltyAdminComponent } from './features/penalty/pages/penalty-admin/penalty-admin.component'; //penalty-admin
import { ActivityComponent } from './features/activity/pages/activity/activity.component';//activity
import { HelpComponent } from './features/help/pages/help/help.component';//help
import {EditProfileComponent } from './features/edit-profile/pages/edit-profile/edit-profile.component'
import {MyBooksComponent} from './features/my-books/pages/my-books/my-books.component'
import {EditUsersComponent} from './features/edit-users/pages/edit-users/edit-users.component'
import { AuthorComponent } from './features/author/pages/author/author.component';//author
import { PublisherComponent } from './features/publisher/pages/publisher/publisher.component';//publisher
import { NotfoundComponent } from './shared/components/notfound/notfound.component';
import { LoginComponent } from './shared/components/authentication/login/login.component';
import { RegisterComponent } from './shared/components/authentication/register/register.component';
import { MaterialDetailComponent } from './shared/components/material-detail/material-detail.component';
import { BookDetailComponent } from './features/book-will-be-deleted/pages/book-detail/book-detail.component';
import { AddMaterialsComponent } from './shared/components/add-materials/add-materials.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { EditMaterialsComponent } from './shared/components/edit-materials/edit-materials.component';
import { ProfileComponent } from './shared/components/profile/profile/profile.component';
import { BookComponent } from './features/book-will-be-deleted/components/book/book.component';
import { ProfileAdminComponent } from './shared/components/profile-admin/profile-admin/profile-admin.component';

export const routes: Routes = 
[
    { path: '', component: MainComponent },
    { path: 'material-detail', component: MaterialDetailComponent },
    { path: 'material-detail/:materialId', component: MaterialDetailComponent },
    { path: 'material-list', component: MaterialListComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },


    {path:'profile',component:ProfileComponent,children:[
        {path:'edit-profile',component:EditProfileComponent},
        {path:'my-materials',component:MyBooksComponent},
        {path: 'penalty', component: PenaltyComponent },
        {path: 'activity', component: ActivityComponent },
        {path:'help',component:HelpComponent}
    ]},
    {path:'profile-admin',component:ProfileAdminComponent,canActivate: [authGuard], data: { requiredRoles: ['Admin']},children:[
        {path:'edit-profile',component:EditProfileComponent},
        {path:'edit-user',component:EditUsersComponent},
        { path: 'add-materials', component: AddMaterialsComponent },
        { path: 'edit-materials', component: EditMaterialsComponent },
        {path:'my-materials',component:MyBooksComponent},
        {path:'publisher',component:PublisherComponent},
        { path: 'penalty', component: PenaltyComponent },
        { path: 'activity', component: ActivityComponent },
        { path: 'penalty-admin', component: PenaltyAdminComponent },
        {path:'author',component:AuthorComponent},
        {path:'help',component:HelpComponent},
    ]},


    { path: '**', component: NotfoundComponent },
];
