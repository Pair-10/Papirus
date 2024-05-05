import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-admin',
  standalone: true,
  imports: [],
  templateUrl: './sidebar-admin.component.html',
  styleUrl: './sidebar-admin.component.css'
})
export class SidebarAdminComponent {
  constructor(private router: Router) {}

  navigateToPenalties() {
    this.router.navigate(['/penalty-admin']);
  }
  navigateToActivity() {
    this.router.navigate(['/activity']);
  }
  navigateToHelp() {
    this.router.navigate(['/help']);
  }
  navigateToEditProfile() {
    this.router.navigate(['/edit-profile']);
  }
  navigateToAddMaterial() {
    this.router.navigate(['/add-materials']);
  }
  navigateToEditMaterial() {
    this.router.navigate(['/edit-materials']);
  }
  navigateToPublisher() {
    this.router.navigate(['/publisher']);
  }
  navigateToAuthor() {
    this.router.navigate(['/author']);
  }
}
