import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { Routes } from '@angular/router';
import { MainComponent } from './shared/components/main/main.component';
import { BookDetailComponent } from './features/book/pages/book-detail/book-detail.component';

export const routes: Routes = [
    {path:'', component:MainComponent},
    {path:'book-detail', component:BookDetailComponent},
];
