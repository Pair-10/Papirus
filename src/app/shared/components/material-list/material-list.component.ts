import { CategoryTypeService } from './../../../services/categoryType/category-type.service';
import { MaterialService } from './../../../services/material/material.service';
import { ListService } from './../../../services/list/list.service';
import { Article } from './../../../models/article/article';
import { Magazine } from './../../../models/magazine/magazine';
import { Book } from './../../../models/book/book';
import { Material } from '../../../models/material/material';
import { ArticleService } from './../../../services/article/article.service';
import { MagazineService } from './../../../services/magazine/magazine.service';
import { BookService } from './../../../services/book/book.service';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { categoryType } from '../../../models/categoryType/categoryType';
import { forkJoin, map, switchMap } from 'rxjs';

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
  materials: Material[] = [];
  categoryType: categoryType[] = [];
  mergedData: any[]= [];
  originalData: any[] = [];
  selectedCategory: string = "";
  categories: any[] = [];
  materialTypes: any[] = [];
  categoryId: string = '';
  materialTypeId: string = '';

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private magazineService: MagazineService,
    private articleService: ArticleService,
    private listservice: ListService,
    private materialService: MaterialService,
    private categorytypeService: CategoryTypeService
  ) {

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.selectedMaterialType = params['type'] || 'book';
      const categoryId = params['categoryId'];
      this.selectedCategory = categoryId !== undefined ? categoryId : "";
      this.loadMaterials();
      this.loadCategories();
      this.getCategoryTypes()
      this.loadBooksAndMaterials();
    });
  }

  //--------------------------------------------------------
  loadCategories() {
    this.listservice.getCategoriess().subscribe(
      (response) => {
        this.categories = response;
        if (this.selectedMaterialType === 'book') {
          this.categoryId = this.categories[0].id
          this.loadCategoryTypes(this.categoryId);
        }
        else if (this.selectedMaterialType === 'magazine') {
          this.loadCategoryTypes(this.categories[0].id);
        }
        else if (this.selectedMaterialType === 'article') {
          this.loadCategoryTypes(this.categories[0].id);
        }
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  loadCategoryTypes(categoryId: string) {
    this.categories = [];
    this.listservice.getCategoryTypes(categoryId).subscribe(
      (response) => {
        if (this.selectedMaterialType === 'book') {
          const filteredItems = response.filter(item => item.categoryId === "f1c535cb-263f-47c8-1e5e-08dc61e8e461");
          for (let item of filteredItems) {
            this.materialTypeId = item.materialTypeId;
            this.loadMaterialTypes(this.materialTypeId)
          }
        }
        else if(this.selectedMaterialType === 'magazine'){
          const filteredItems = response.filter(item => item.categoryId === "fa0be4d1-3580-4ddb-1e5f-08dc61e8e461");
          for (let item of filteredItems) {
            this.materialTypeId = item.materialTypeId;
            this.loadMaterialTypes(this.materialTypeId)
          }
        }
        else if(this.selectedMaterialType === 'article'){
          const filteredItems = response.filter(item => item.categoryId === "7f15efda-deb4-438f-1e60-08dc61e8e461");
          for (let item of filteredItems) {
            this.materialTypeId = item.materialTypeId;
            this.loadMaterialTypes(this.materialTypeId)
          }
        }
      },
      (error) => {
        console.error('Error fetching category types:', error);
      }
    );
  }

  loadMaterialTypes(materialTypeId: string) {
    this.materialTypes = [];
    this.listservice.getMaterialTypes(materialTypeId).subscribe(
      (response) => {
        const filteredItems = response.filter(item => item.id === materialTypeId);
        filteredItems.forEach(item => {
          if (!this.materialTypes.includes(item.name)) {
            this.materialTypes.push(item.name);
          }
        });
      },
      (error) => {
        console.error('Error fetching material types:', error);
      }
    );
  }
  //--------------------------------------------------------

  getCategoryTypes(){
      this.categorytypeService.getCategoryTypes().subscribe(response => {
      });
  }
  selectCategory(categoryName: string) {
    this.selectedCategory = "";
    this.bookService.getMaterialTypeBook(categoryName).pipe(
      switchMap(response => {
        // Seçilen kategoriye ait materialTypeId'yi seçili kategoriye ata
        response.map(category=>this.selectedCategory = category.id)
        // MergedData'yı filtreleme
        return forkJoin(
          this.mergedData.map(veri =>
            this.categorytypeService.getCategoryType(veri.book.materialId, veri.book.categoryId).pipe(
              map(responses => {
                // Veri varsa, her bir response için materialTypeId'yi kontrol et
                return responses.some(veri => veri.materialTypeId === this.selectedCategory);
              })
            )
          )
        );
      })
    ).subscribe(
      (results: boolean[]) => {
        // MergedData'yı filtreleme
        this.originalData = [...this.mergedData]; // Orijinal verileri yeniden yükle
        this.originalData = this.mergedData.filter((veri, index) => results[index]);
  
      },
      (error) => {
        console.error('Error fetching material types:', error);
      }
    );
  }
  
  

  getMaterial(materialId: string){
    this.materialService.getMaterialsByMaterialId(materialId).subscribe(
      (response) => {
        this.materials.push(response);
      }
    );
  }
  mergeBooksAndMaterials(books: Book[], materials: Material[]): any[] {
    books.forEach((book: Book) => {
      const material = materials.find((material: Material) => material.id === book.materialId);
      if (material) {
        const mergedItem = { book, material }; 
        this.mergedData.push(mergedItem);
      }
    });
    this.originalData = [...this.mergedData]
    return this.mergedData;
  }

  loadBooksAndMaterials(){
    this.mergedData = [];
    this.bookService.getBooks().subscribe(books => {
      books.forEach(material=>{
        this.materialService.getMaterialsByMaterialId(material.materialId).subscribe(
          (response) => {
            this.mergeBooksAndMaterials(books, [response]);
            
          }
        );
      })
    });
  }

  loadMaterials() {
    if (this.selectedMaterialType === 'book') {

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
