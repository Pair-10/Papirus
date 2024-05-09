import { AuthorService } from './../../../services/author/author.service';
import { MagazineService } from '../../../services/magazine/magazine.service';
import { Component, OnInit, inject } from '@angular/core';
import { SidebarAdminComponent } from '../sidebar-admin/sidebar-admin.component';
import { FormBuilder, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { MaterialService } from '../../../services/material/material.service';
import { CommonModule } from '@angular/common';
import { BookService } from '../../../services/book/book.service';
import { ArticleService } from '../../../services/article/article.service';
import { ListService } from '../../../services/list/list.service';
import { PublisherService } from '../../../services/publisher/publisher.service';
import { MaterialPublisherService } from '../../../services/material-publisher/material-publisher.service';
import { MaterialAuthorService } from '../../../services/material-author/material-author.service';

@Component({
  selector: 'app-add-materials',
  standalone: true,
  imports: [SidebarAdminComponent,ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './add-materials.component.html',
  styleUrl: './add-materials.component.css'
})

export class AddMaterialsComponent implements OnInit {
  formBuilder = inject(FormBuilder)
  bookService = inject(BookService)
  magazineService = inject(MagazineService)
  articleService = inject(ArticleService)
  materialService =  inject(MaterialService)
  listService = inject(ListService)
  authorService = inject(AuthorService)
  publisherService = inject(PublisherService)
  materialPublisherService = inject(MaterialPublisherService)
  materialAuthorService = inject(MaterialAuthorService)
  materialId : string = "";
  materials: any[] = [{}];
  authors: any[] = [{}];
  publishers: any[] = [{}];
  erisim : boolean = false;
  selectedOption: string = '';
  materialTypeNames : any;
  
  materialForm = this.formBuilder.group({
    materialName: [''],
    quantity: [''],
    language: [''],
    pageCount: [''],
    status: [true],
    publicationDate: ['']
  });

  ngOnInit(): void {
    this.materialService.getMaterial().subscribe(
      (responses)=>{
        this.materials = responses.items;
      }
    )
    this.listService.getMaterialTypeNames().subscribe(
      response =>{
        this.materialTypeNames = response.items
      }
    )
    this.authorService.getAuthors().subscribe(
      response =>{
        this.authors = response.items
      }
    )
    this.publisherService.getPublishers().subscribe(
      response =>{
        this.publishers = response.items
      }
    )
  }

  onSubmit(){
    this.materialService.setMaterial(this.materialForm.value).subscribe(
      (response) =>{
        this.materialId = response.id;
        this.erisim = false;
        this.materialService.getMaterial().subscribe(
          (responses)=>{
            this.materials = responses.items;
          }
        )
      }
    )
  }
  

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      // Burada dosyayı işleyebilirsiniz
      console.log(selectedFile);
    }
  }


  setOtherMaterial(formValue: any, formType: string){
    this.listService.setCategoryTypes(formValue.materialId,formValue.categoryId,formValue.materialTypeName).subscribe();
    this.materialPublisherService.setMaterialPublisher(formValue.materialId, formValue.publisherId).subscribe();
    this.materialAuthorService.setMaterialAuthor(formValue.materialId, formValue.authorId).subscribe();
    if(formType === 'bookForm'){
      this.bookService.setBooks(formValue).subscribe()
      formValue="";
    }
    else if(formType === 'magazineForm'){
      this.magazineService.setMagazines(formValue).subscribe()
      formValue="";
    }
    else if(formType === 'articleForm'){
      this.articleService.setArticles(formValue).subscribe()
      formValue="";
    }
    
  }
}
