import { Routes } from '@angular/router';
import { MainComponent } from './shared/components/main/main.component';
import { BookDetailComponent } from './features/book/pages/book-detail/book-detail.component';
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



export const routes: Routes = [
    { path: '', component: MainComponent },
    { path: 'book-detail', component: BookDetailComponent },
    { path: 'penalty', component: PenaltyComponent }, //penalty
    { path: 'material-list', component: MaterialListComponent },
    { path: 'penalty-admin', component: PenaltyAdminComponent }, //penalty-admin
    { path: 'activity', component: ActivityComponent }, //activity
    {path:'help',component:HelpComponent},//help
    {path:'edit-profile',component:EditProfileComponent},
    {path:'My-Material',component:MyBooksComponent},
    {path:'edit-user',component:EditUsersComponent},
    {path:'author',component:AuthorComponent},//author
    {path:'publisher',component:PublisherComponent},//publisher
    { path: '**', component: NotfoundComponent },
    
  

];
