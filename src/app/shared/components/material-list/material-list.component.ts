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
import { Component,  OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { categoryType } from '../../../models/categoryType/categoryType';
import { catchError, forkJoin, map, of, switchMap } from 'rxjs';

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
  mergedData2: any[]= [];
  mergedData3: any[]= []
  originalData: any[] = [];
  originalData2: any[] = [];
  originalData3: any[] = [];
  selectedCategory: string = "";
  categories: any[] = [];
  materialTypes: any[] = [];
  categoryId: string = '';
  materialTypeId: string = '';
  categoryname: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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
      this.categoryname = params['categoryId'];
      this.selectedCategory = this.categoryname !== undefined ? this.categoryname : "";
      this.loadMaterials(this.categoryname);
      this.loadCategoryTypes();
    });
  }

  //--------------------------------------------------------
  loadCategoryTypes() {
    this.categories = [];
    this.listservice.getCategoryTypes().subscribe(
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
  materialyazdir(material: any) {

    this.router.navigate(['/material-detail'], { state: { material } });
  }


  //--------------------------------------------------------
  selectCategory(categoryName: string) {
    this.selectedCategory = "";
    this.listservice.getMaterialType(categoryName).pipe(
      switchMap(response => {
        // Seçilen kategoriye ait materialTypeId'yi seçili kategoriye ata
        response.map(category=>{this.selectedCategory = category.id})
        // MergedData'yı filtreleme
        if(this.selectedMaterialType === 'book'){
          return forkJoin(
            this.mergedData.map(veri =>
              this.categorytypeService.getCategoryType(veri.book.materialId, veri.book.categoryId).pipe(
                map(responses => {
                  // Veri varsa, her bir response için materialTypeId'yi kontrol et
                  return responses.some(veri => veri.materialTypeId === this.selectedCategory);
                }),
                catchError(error => {
                  console.error('Error fetching category types:', error);
                  return of(false); // Hata durumunda false döndür
                })
              )
            )
          );
        }
        else if(this.selectedMaterialType === 'magazine'){
          return forkJoin(
            this.mergedData2.map(veri=>
              this.categorytypeService.getCategoryType(veri.magazine.materialId, veri.magazine.categoryId).pipe(
                map(responses => {
                  // Veri varsa, her bir response için materialTypeId'yi kontrol et
                  return responses.some(veri => veri.materialTypeId === this.selectedCategory);
                })
              )
            )
          )
        }
        else if(this.selectedMaterialType === 'article'){
          return forkJoin(
            this.mergedData3.map(veri=>
              this.categorytypeService.getCategoryType(veri.article.materialId, veri.article.categoryId).pipe(
                map(responses => {
                  // Veri varsa, her bir response için materialTypeId'yi kontrol et
                  return responses.some(veri => veri.materialTypeId === this.selectedCategory);
                })
              )
            )
          )
        }
        else{
          return response;
        }
      })
    ).subscribe(
      (results: boolean[]) => {
        if(this.selectedMaterialType === 'book'){
          this.originalData = [...this.mergedData]; // Orijinal verileri yeniden yükle
          this.originalData = this.mergedData.filter((veri, index) => results[index]);
        }
        else if(this.selectedMaterialType === 'magazine'){
          this.originalData2 = [...this.mergedData2]; // Orijinal verileri yeniden yükle
          this.originalData2 = this.mergedData2.filter((veri, index) => results[index]);
        }
        else if(this.selectedMaterialType === 'article'){
          this.originalData3 = [...this.mergedData3]; // Orijinal verileri yeniden yükle
          this.originalData3 = this.mergedData3.filter((veri, index) => results[index]);
        }
  
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
    if(this.categoryname){
      this.selectCategory(this.categoryname)
      return [];
    }
    else{
    this.originalData = [...this.mergedData]
    return this.mergedData;
  }
  }

  mergeMagazinesAndMaterials(magazines: Magazine[], materials: Material[]): any[] {
    magazines.forEach((magazine: Magazine) => {
        const material = materials.find((material: Material) => material.id === magazine.materialId);
        if (material) {
            const mergedItem = { magazine, material };
            this.mergedData2.push(mergedItem);
        }
    });
    if(this.categoryname){
      this.selectCategory(this.categoryname)
      return [];
    }
    else{
    this.originalData2 = [...this.mergedData2]
    return this.mergedData2;
  }
}

  mergeArticlesAndMaterials(articles:Article[], materials: Material[]):any [] {
    articles.forEach((article: Article)=>{
      const material = materials.find((material:Material) => material.id === article.materialId);
      if(material) {
        const mergedItem = { article, material};
        this.mergedData3.push(mergedItem);
      }
    });
    if(this.categoryname){
      this.selectCategory(this.categoryname)
      return [];
    }
    else{
    this.originalData3 = [...this.mergedData3]
    return this.mergedData3;
  }
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
  loadMagazinesAndMaterials() {
    this.mergedData2 = [];
    this.magazineService.getMagazines().subscribe(magazines => {
        const magazineObservables = magazines.map(magazine => this.materialService.getMaterialsByMaterialId(magazine.materialId));
        forkJoin(magazineObservables).subscribe(
            (responses) => {
                this.mergeMagazinesAndMaterials(magazines, responses);
            },
            (error) => {
                console.error('Error fetching materials for magazines:', error);
            }
        );
    });
}



  loadArticleAndMaterials(){
    this.mergedData3 = [];
    this.articleService.getArticles().subscribe(articles =>{
      const articleObservables = articles.map(article => this.materialService.getMaterialsByMaterialId(article.materialId));
        forkJoin(articleObservables).subscribe(
            (responses) => {
                this.mergeArticlesAndMaterials(articles, responses);
            },
            (error) => {
                console.error('Error fetching materials for articles:', error);
            }
        );
    });
  }
  

  loadMaterials(deneme:string) {
    if (this.selectedMaterialType === 'book') {
      this.loadBooksAndMaterials();
    } else if (this.selectedMaterialType === 'magazine') {
      this.loadMagazinesAndMaterials();
    } else if (this.selectedMaterialType === 'article') {
      this.loadArticleAndMaterials();
    }
  }
}
