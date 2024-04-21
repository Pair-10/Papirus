import { Component, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { MainComponent } from './shared/components/main/main.component';
import { CommunicationService } from './services/communication.service';
import { LoginComponent } from './shared/components/authentication/login/login.component';
import { RegisterComponent } from './shared/components/authentication/register/register.component';
import { ForgotPasswordComponent } from './shared/components/authentication/forgot-password/forgot-password.component';
import { NewPasswordComponent } from './shared/components/authentication/new-password/new-password.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, MainComponent, FooterComponent, RouterOutlet, RouterLink, LoginComponent, RegisterComponent, ForgotPasswordComponent, NewPasswordComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'papirus';
  constructor(private communicationService: CommunicationService) {}

    onMaterialTypeSelected(type: string) {
        this.communicationService.setMaterialType(type);
    }
};

