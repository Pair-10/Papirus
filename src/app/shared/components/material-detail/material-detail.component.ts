import { AuthorService } from './../../../services/author/author.service';
import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommentComponent } from '../../../features/comment/components/comment/comment.component';
import { ActivatedRoute } from '@angular/router';
import { MaterialAuthorService } from '../../../services/material-author/material-author.service';
import { ListService } from '../../../services/list/list.service';
import { MaterialPublisherService } from '../../../services/material-publisher/material-publisher.service';
import { PublisherService } from '../../../services/publisher/publisher.service';

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
  materialPublishers: any[] = [];
  authors: any[] = []; 
  publishers: any[] = [];
  tur: any;
  year: number = 0;

  constructor(
    private route: ActivatedRoute,
    private materialAuthorService: MaterialAuthorService,
    private authorService: AuthorService,
    private listService: ListService,
    private materialPublisherService: MaterialPublisherService,
    private publisherService: PublisherService,
  ) { }

  ngOnInit(): void {
    this.material = history.state.material;
    this.materialId = history.state.material.material.id;
    this.materialAuthor(this.materialId)
  }

  materialAuthor(materialId: any){
    const date = new Date(this.material.material.publicationDate)
    this.year = date.getFullYear();
    this.listService.getCategoryTypes().subscribe(
      (response) => {
          let foundMaterialTypeId: string | undefined;
  
          for (let i = 0; i < response.length; i++) {
              if (response[i].materialId === materialId) {
                  foundMaterialTypeId = response[i].materialTypeId;
                  break;
              }
          }
  
          if (foundMaterialTypeId) {
              this.listService.getMaterialTypes(foundMaterialTypeId).subscribe(
                  (materialTypes) => {
                      const materialType = materialTypes.find(veri => veri.id === foundMaterialTypeId);
                      if (materialType) {
                          this.tur = materialType.name;
                      } else {
                          console.log("Material type not found.");
                      }
                  },
                  (error) => {
                      console.error("Error fetching material types:", error);
                  }
              );
          } else {
              console.log("Material not found in the response.");
          }
      },
      (error) => {
          console.error("Error fetching category types:", error);
      }
  );
    this.materialAuthorService.getMaterialAuthors(materialId).subscribe(
      (response) => {
        this.materialAuthors = response;
        for (let materialAuthor of this.materialAuthors) {
          this.authorService.getAuthor(materialAuthor.authorId).subscribe(
              (authorArray) => {
                const author = authorArray[0];
                  // Tek bir yazar dönüyor, bu yüzden direkt olarak this.authors'a atayabiliriz
                  this.authors.push(author);
              }
          );
      }
      }
    )
    this.materialPublisherService.getMaterialPublisher(materialId).subscribe(
      (response)=>{
        {
          this.materialPublishers = response;
          for (let materialPublisher of this.materialPublishers) {
            this.publisherService.getPublisher(materialPublisher.publisherId).subscribe(
                (publisherArray) => {
                  const publisher = publisherArray[0];
                    // Tek bir yazar dönüyor, bu yüzden direkt olarak this.authors'a atayabiliriz
                    this.publishers.push(publisher);
                }
            );
        }
        }
      }
    )
  }




}
