import { MagazineService } from '../../../services/magazine/magazine.service';
import { Component, OnInit, inject } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormBuilder, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { MaterialService } from '../../../services/material/material.service';
import { CommonModule } from '@angular/common';
import { BookService } from '../../../services/book/book.service';
import { ArticleService } from '../../../services/article/article.service';

@Component({
  selector: 'app-add-materials',
  standalone: true,
  imports: [SidebarComponent,ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './add-materials.component.html',
  styleUrl: './add-materials.component.css'
})

export class AddMaterialsComponent implements OnInit {
  formBuilder = inject(FormBuilder)
  bookService = inject(BookService)
  magazineService = inject(MagazineService)
  articleService = inject(ArticleService)
  materialService =  inject(MaterialService)
  materialId : string = "";
  materials: any[] = [{}];
  erisim : boolean = true;
  selectedOption: string = '';
  
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
  
  setOtherMaterial(formValue: any, formType: string){
    if(formType === 'bookForm'){
      this.bookService.setBooks(formValue).subscribe(
        response =>{
          console.log(response);
        }
      )
      formValue="";
    }
    else if(formType === 'magazineForm'){
      this.magazineService.setMagazines(formValue).subscribe(
        response =>{
          console.log(response);
        }
      )
      formValue="";
    }
    else if(formType === 'articleForm'){
      this.articleService.setArticles(formValue).subscribe(
        response =>{
          console.log(response);
        }
      )
      formValue="";
    }

  }
}
