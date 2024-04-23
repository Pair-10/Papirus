import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ArticleService } from './../../../services/article/article.service';
import { MagazineService } from './../../../services/magazine/magazine.service';
import { BookService } from './../../../services/book/book.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
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
  }
  bookcategories$: Observable<{ id: string; name: string }[]> = of([]);
  magazinecategories$: Observable<{ id: string; name: string }[]> = of([]);
  articlecategories$: Observable<{ id: string; name: string }[]> = of([]);
  @Output() materialTypeSelected = new EventEmitter<string>();
  constructor(
    private router: Router,
    private bookService: BookService,
    private magazineService: MagazineService,
    private articleService: ArticleService
  ) { }
  
  loadCategories() {
    this.bookcategories$ = this.bookService.getCategories();
    this.magazinecategories$ = this.magazineService.getCategories();
    this.articlecategories$ = this.articleService.getCategories();
}
ngOnInit(){
  this.loadCategories();
}
onCategoryClick(categoryId: string) {
  // Redirect to the material list page with the selected category ID as query parameter
  this.router.navigate(['/material-list'], { queryParams: { categoryId } });
}

selectCategory(categoryId: string,categoryType: string) {
  this.router.navigate(['/material-list'], { queryParams: { type: categoryType, categoryId: categoryId } });
}

  onMaterialTypeClick(type: string) {
    this.materialTypeSelected.emit(type);
    this.router.navigate(['/material-list'], { queryParams: { type } });
}
}
