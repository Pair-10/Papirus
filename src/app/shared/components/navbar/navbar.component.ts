import { ListService } from './../../../services/list/list.service';
import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Observable, catchError, forkJoin, map, of, switchMap } from 'rxjs';

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
  materialTypes: any[] = [];
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  onHover(index: number, isHover: boolean) {
    this.isHovered[index] = isHover;
  }
  toggleHamburgerMenu() {
    this.hamburgerMenuOpen = !this.hamburgerMenuOpen;
  }
  bookcategories: any[]=[];
  magazinecategories: any[]=[];
  articlecategories: any[]=[];
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
  this.loadCategoryTypes();
}

selectCategory(categoryId: string,categoryType: string) {
  this.router.navigate(['/material-list'], { queryParams: { type: categoryType, categoryId: categoryId } });
}


  onMaterialTypeClick(type: string) {
    this.materialTypeSelected.emit(type);
    this.router.navigate(['/material-list'], { queryParams: { type } });
}
}
