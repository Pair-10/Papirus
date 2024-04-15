import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  hamburgerMenuOpen = false;
  isMenuOpen = false;
  isHovered: boolean[] = [false, false, false];
  isLoggedIn = true;
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  onHover(index: number, isHover: boolean) {
    this.isHovered[index] = isHover;
  }
  toggleHamburgerMenu() {
    this.hamburgerMenuOpen = !this.hamburgerMenuOpen;
    console.log("basildi")
}
}
