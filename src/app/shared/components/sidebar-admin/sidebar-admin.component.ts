import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from '../../../services/navbar/navbar.service';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-sidebar-admin',
  standalone: true,
  imports: [],
  templateUrl: './sidebar-admin.component.html',
  styleUrl: './sidebar-admin.component.css'
})
export class SidebarAdminComponent {
  navbarService=inject(NavbarService)
  userService=inject(UserService)
  constructor(private router: Router) {}
  username: string="";
  lastname: string="";
  getUser() {
    this.userService.getUser().subscribe((response)=>{
      this.username = response.firstName;
      this.lastname = response.lastName;
    })
  }
  ngOnInit(): void {
    this.getUser();
  }
  navigateToPenalties() {
    this.router.navigate(['profile-admin/penalty-admin']);
  }
  navigateToActivity() {
    this.router.navigate(['profile-admin/activity']);
  }
  navigateToHelp() {
    this.router.navigate(['profile-admin/help']);
  }
  navigateToEditProfile() {
    this.router.navigate(['profile-admin/edit-profile']);
  }

  navigateToEditUser() {
    this.router.navigate(['profile-admin/edit-user']);
  }
  navigateToAddMaterial() {
    this.router.navigate(['profile-admin/add-materials']);
  }
  navigateToEditMaterial() {
    this.router.navigate(['profile-admin/edit-materials']);
  }
  navigateToPublisher() {
    this.router.navigate(['profile-admin/publisher']);
  }
  navigateToAuthor() {
    this.router.navigate(['profile-admin/author']);
  }
  navigateToSignOut() {
    this.navbarService.setLoggedIn(false)
    this.router.navigate(['/']);
    localStorage.removeItem("Token")
  }
}
