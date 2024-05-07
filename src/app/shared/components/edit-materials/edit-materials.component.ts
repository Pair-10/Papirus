import { MagazineService } from './../../../services/magazine/magazine.service';
import { BookService } from './../../../services/book/book.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { SidebarAdminComponent } from '../sidebar-admin/sidebar-admin.component';
import { MaterialService } from '../../../services/material/material.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticleService } from '../../../services/article/article.service';
import { NotificationService } from '../../../services/notification/notification.service';
import { UserService } from '../../../services/user/user.service';


@Component({
  selector: 'app-edit-materials',
  standalone: true,
  imports: [CommonModule, SidebarAdminComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './edit-materials.component.html',
  styleUrl: './edit-materials.component.css'
})
export class EditMaterialsComponent implements OnInit {
  materialService = inject(MaterialService)
  bookService = inject(BookService)
  magazineService = inject(MagazineService)
  articleService = inject(ArticleService)
  notificationService = inject(NotificationService)
  userService = inject(UserService)
  materials: any;
  selectedMaterial: any = null;
  deletingMaterial: any = null;
  books: any[] = [{}];
  magazines: any[] = [{}];
  articles: any[] = [{}];
  isDeleteConfirmationVisible: any = false;

  ngOnInit(): void {
    this.materialService.getMaterial().subscribe(
      (responses) => {
        this.materials = responses.items;
      }
    )
    this.bookService.getBooks().subscribe(
      response => {
        this.books = response
      }
    )
    this.magazineService.getMagazines().subscribe(
      response => {
        this.magazines = response
      }
    )
    this.articleService.getArticles().subscribe(
      response => {
        this.articles = response
      }
    )
  }



  editMaterial(material: any) {
    this.selectedMaterial = { ...material };
  }



  deleteMaterial(material: any) {
    this.isDeleteConfirmationVisible = true
    this.deletingMaterial = { ...material };
    
    
  }


  confirmDelete() {
    this.materialService.deleteMaterial(this.deletingMaterial).subscribe()
    const foundBook = this.books.find(book => book.materialId === this.deletingMaterial.id);
    if (foundBook) {
      this.bookService.deleteBook(foundBook).subscribe();
      return;
    }

    const foundMagazine = this.magazines.find(magazine => magazine.materialId === this.deletingMaterial.id);
    if (foundMagazine) {
      this.magazineService.deleteMagazine(foundMagazine).subscribe();
      return;
    }

    const foundArticle = this.articles.find(article => article.materialId === this.deletingMaterial.id);
    if (foundArticle) {
      this.articleService.deleteArticle(foundArticle).subscribe();
      return;
    }
    console.log('Materyal bulunamadı');
    this.isDeleteConfirmationVisible = false
  }




  closeDeleteConfirmation() {
    this.isDeleteConfirmationVisible = false
  }




  saveMaterial(material: any) {
    this.materialService.updateMaterial(material).subscribe(
      response => {
        this.ngOnInit();
      }
    )
    this.closePopup();
  }


  
  closePopup() {
    this.selectedMaterial = null; // Pop-up formunu kapatmak için seçili malzemeyi temizle
  }
}
