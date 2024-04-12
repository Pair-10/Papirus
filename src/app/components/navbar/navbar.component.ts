import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isMenuOpen = false;
  isHovered: boolean[] = [false, false, false];
  isLoggedIn = false;
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    console.log(this.isMenuOpen)
  }
  onHover(index: number, isHover: boolean) {
    this.isHovered[index] = isHover;
  }
}
