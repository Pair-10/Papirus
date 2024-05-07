import { Component } from '@angular/core';
import { SidebarAdminComponent } from '../../sidebar-admin/sidebar-admin.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-profile-admin',
  standalone: true,
  imports: [SidebarAdminComponent,RouterOutlet],
  templateUrl: './profile-admin.component.html',
  styleUrl: './profile-admin.component.css'
})
export class ProfileAdminComponent {

}
