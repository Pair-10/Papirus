import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../../services/sidebar/user.service';
import { NavbarService } from '../../../services/navbar/navbar.service';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
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
    this.router.navigate(['/penalty']);
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
  navigateToEditUser(){
    this.router.navigate(['/edit-user']);
  }
  navigateToMyBook() {
    this.router.navigate(['/my-materials']);
  }
  navigateToAddMaterials(){
    this.router.navigate(['/add-materials']);
  }
  navigateToEditMaterials(){
    this.router.navigate(['/edit-materials']);
  }
  navigateToSignOut() {
    this.navbarService.setLoggedIn(false)
    this.router.navigate(['/']);
    localStorage.removeItem("Token")
  }
}
