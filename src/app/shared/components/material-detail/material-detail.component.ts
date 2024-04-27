import { AuthorService } from './../../../services/author/author.service';
import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommentComponent } from '../../../features/comment/components/comment/comment.component';
import { ActivatedRoute } from '@angular/router';
import { MaterialAuthorService } from '../../../services/material-author/material-author.service';

@Component({
  selector: 'app-material-detail',
  standalone: true,
  imports: [CommonModule,CommentComponent],
  templateUrl: './material-detail.component.html',
  styleUrl: './material-detail.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MaterialDetailComponent implements OnInit{
  material: any;
  materialId: any;
  materialAuthors: any[] = [];
  authors: any[] = []; 

  constructor(
    private route: ActivatedRoute,
    private materialAuthorService: MaterialAuthorService,
    private authorService: AuthorService
  ) { }

  ngOnInit(): void {
    this.material = history.state.material;
    this.materialId = history.state.material.material.id;
    this.materialAuthor(this.materialId)
  }

  materialAuthor(materialId: any){
    this.materialAuthorService.getMaterialAuthors(materialId).subscribe(
      (response) => {
        this.materialAuthors = response;
        for (let materialAuthor of this.materialAuthors) {
          this.authorService.getAuthor(materialAuthor.authorId).subscribe(
              (authorArray) => {
                const author = authorArray[0];
                  // Tek bir yazar dönüyor, bu yüzden direkt olarak this.authors'a atayabiliriz
                  this.authors.push(author);
                  console.log(this.authors[0].name, this.authors[0].surname);
              }
          );
      }
      }
    )
  }




}
