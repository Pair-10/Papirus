import { Routes } from '@angular/router';
import { MainComponent } from './shared/components/main/main.component';
import { BookDetailComponent } from './features/book/pages/book-detail/book-detail.component';
import { PenaltyComponent } from './features/penalty/pages/penalty/penalty.component'; //penalty
import { MaterialListComponent } from './shared/components/material-list/material-list.component';
import { PenaltyAdminComponent } from './features/penalty/pages/penalty-admin/penalty-admin.component'; //penalty-admin
import { ActivityComponent } from './features/activity/pages/activity/activity.component';//activity

export const routes: Routes = [
    { path: '', component: MainComponent },
    { path: 'book-detail', component: BookDetailComponent },
    { path: 'penalty', component: PenaltyComponent }, //penalty
    { path: 'material-list', component: MaterialListComponent },
    { path: 'penalty-admin', component: PenaltyAdminComponent }, //penalty-admin
    { path: 'activity', component: ActivityComponent }, //activity
];
