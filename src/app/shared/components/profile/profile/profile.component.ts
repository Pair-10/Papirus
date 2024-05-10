import { Component } from '@angular/core';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [SidebarComponent,RouterOutlet,ProfileComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

}
