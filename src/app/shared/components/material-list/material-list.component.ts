import { Article } from './../../../models/article/article';
import { Magazine } from './../../../models/magazine/magazine';
import { Book } from './../../../models/book/book';
import { ArticleService } from './../../../services/article/article.service';
import { MagazineService } from './../../../services/magazine/magazine.service';
import { BookService } from './../../../services/book/book.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';

@Component({
    selector: 'app-material-list',
    templateUrl: './material-list.component.html',
    styleUrls: ['./material-list.component.css'],
    standalone: true,
    imports: [CommonModule]
})
export class MaterialListComponent implements OnInit {
    selectedMaterialType: string = 'book';
    books: Book[] = [];
    magazines: Magazine[] = [];
    articles: Article[] = [];
    categories$: Observable<{ id: string; name: string }[]> = of([]);
    // Seçilen kategori
    selectedCategory: string = "";

    constructor(
        private route: ActivatedRoute,
        private bookService: BookService,
        private magazineService: MagazineService,
        private articleService: ArticleService
    ) {
        
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
          this.selectedMaterialType = params['type'] || 'book';
          const categoryId = params['categoryId'];
          this.selectedCategory = categoryId !== undefined ? categoryId : "";
          this.loadMaterials();
          this.loadCategories();
        });
      }
    loadCategories() {
        // `selectedMaterialType` değiştiğinde kategorileri güncelleyin
        this.categories$ = this.selectedMaterialType === 'book'
            ? this.bookService.getCategories()
            : this.selectedMaterialType === 'article'
                ? this.articleService.getCategories()
                : this.magazineService.getCategories();
    }
    selectCategory(categoryId: string) {
        this.selectedCategory = categoryId;
        this.loadMaterials();
    }
    loadMaterials() {
        if (this.selectedMaterialType === 'book') {
            this.bookService.getBooks().subscribe(books => {
                // Kategoriyi filtreleyin
                this.books = this.selectedCategory
                    ? books.filter(book => book.categoryId === this.selectedCategory)
                    : books;
            });
        } else if (this.selectedMaterialType === 'magazine') {
            this.magazineService.getMagazines().subscribe(magazines => {
                // Kategoriyi filtreleyin
                this.magazines = this.selectedCategory
                    ? magazines.filter(magazine => magazine.categoryId === this.selectedCategory)
                    : magazines;
            });
        } else if (this.selectedMaterialType === 'article') {
            this.articleService.getArticles().subscribe(articles => {
                // Kategoriyi filtreleyin
                this.articles = this.selectedCategory
                    ? articles.filter(article => article.categoryId === this.selectedCategory)
                    : articles;
            });
        }
    }
}
