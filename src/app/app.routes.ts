import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { Routes } from '@angular/router';
import { MainComponent } from './shared/components/main/main.component';

export const routes: Routes = [
    {path:'', component:MainComponent},
];
