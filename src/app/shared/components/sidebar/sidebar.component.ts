import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(private router: Router) {}

  ngOnInit(): void {
    
    console.log(localStorage.getItem("Token"))
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
  navigateToMyBook() {
    this.router.navigate(['/My-Material']);
  }
}
