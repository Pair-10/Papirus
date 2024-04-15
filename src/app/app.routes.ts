import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { Routes } from '@angular/router';
import { MainComponent } from './shared/components/main/main.component';
import { BookDetailComponent } from './features/book/pages/book-detail/book-detail.component';
import { PenaltyComponent } from './features/penalty/pages/penalty/penalty.component';//penalty
//import { PenaltyAdminComponent } from './features/penalty-admin/pages/penalty-admin/penalty-admin.component';//penalty-admin
export const routes: Routes = [
    {path:'', component:MainComponent},
    {path:'book-detail', component:BookDetailComponent,},
    { path: 'penalty', component: PenaltyComponent },//penalty
    //{ path: 'penalty-admin', component: PenaltyAdminComponent },//penalty-admin
];



