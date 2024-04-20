import { Routes } from '@angular/router';
import { MainComponent } from './shared/components/main/main.component';
import { BookDetailComponent } from './features/book/pages/book-detail/book-detail.component';
import { PenaltyComponent } from './features/penalty/pages/penalty/penalty.component'; //penalty
import { MaterialListComponent } from './shared/components/material-list/material-list.component';
import { NotfoundComponent } from './shared/components/notfound/notfound.component';
import { EditProfileComponent } from './features/edit-profile/pages/edit-profile/edit-profile.component';
import { MyBooksComponent } from './features/my-books/pages/my-books/my-books.component';
import { EditUsersComponent } from './features/edit-users/pages/edit-users/edit-users.component';

export const routes: Routes = [
    { path: '', component: MainComponent },
    { path: 'book-detail', component: BookDetailComponent },
    { path: 'penalty', component: PenaltyComponent }, //penalty
    { path: 'material-list', component: MaterialListComponent },
    { path: 'edit-profile', component: EditProfileComponent },
    { path: 'edit-users', component: EditUsersComponent },
    { path: 'my-materials', component: MyBooksComponent },
    { path: '**', component: NotfoundComponent }
];
