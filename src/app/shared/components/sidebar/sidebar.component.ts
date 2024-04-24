import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
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
}
