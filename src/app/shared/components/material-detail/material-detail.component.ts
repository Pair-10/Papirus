import { MaterialService } from './../../../services/material/material.service';
import { BookService } from './../../../services/book/book.service';
import { JwtService } from './../../../services/jwt/jwt.service';
import { AuthorService } from './../../../services/author/author.service';
import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit,} from '@angular/core';
import { CommentComponent } from '../../../features/comment/components/comment/comment.component';
import { ActivatedRoute } from '@angular/router';
import { MaterialAuthorService } from '../../../services/material-author/material-author.service';
import { ListService } from '../../../services/list/list.service';
import { MaterialPublisherService } from '../../../services/material-publisher/material-publisher.service';
import { PublisherService } from '../../../services/publisher/publisher.service';
import { BorrowMaterialComponent } from '../borrow-material/borrow-material/borrow-material.component';
import { BorrowMaterialService } from '../../../services/borrow-material/borrow-material.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MagazineService } from '../../../services/magazine/magazine.service';
import { ArticleService } from '../../../services/article/article.service';
@Component({
  selector: 'app-material-detail',
  standalone: true,
  imports: [ CommonModule, CommentComponent, BorrowMaterialComponent, ReactiveFormsModule],
  templateUrl: './material-detail.component.html',
  styleUrl: './material-detail.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MaterialDetailComponent implements OnInit {
  material: any;
  urlMaterial: any;
  materialId: any;
  materialAuthors: any[] = [];
  materialPublishers: any[] = [];
  authors: any[] = [];
  publishers: any[] = [];
  tur: any;
  year: number = 0;
  token: any;
  decodedToken: any;
  userId: any;
  borrow: boolean = false;
  borrowForm!: FormGroup;
  odunc_alindi: boolean = false;
  book: any;
  magazine: any;
  article: any;

  constructor(
    private route: ActivatedRoute,
    private materialAuthorService: MaterialAuthorService,
    private authorService: AuthorService,
    private listService: ListService,
    private materialPublisherService: MaterialPublisherService,
    private publisherService: PublisherService,
    private jwtService: JwtService,
    private borrowService: BorrowMaterialService,
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private magazineService: MagazineService,
    private articleService: ArticleService,
    private materialService: MaterialService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if (params.get('materialId')) {
        this.materialId = params.get('materialId');
        this.materialService
          .getMaterialsByMaterialId(this.materialId)
          .subscribe((response) => {
            this.urlMaterial = response;
            this.bookService.getBook().subscribe((book) => {
              this.book = book.items.find(
                (item: any) => item.materialId === this.materialId
              );
              if (this.book) {
                this.material = { book: this.book, material: this.urlMaterial };
                this.materialAuthor(this.materialId);
                this.createForm();
                return;
              }
              this.magazineService.getMagazine().subscribe((magazine) => {
                this.magazine = magazine.items.find(
                  (item: any) => item.materialId === this.materialId
                );
                if (this.magazine) {
                  this.material = {
                    magazine: this.magazine,
                    material: this.urlMaterial,
                  };
                  this.materialAuthor(this.materialId);
                  this.createForm();
                  return;
                }
                this.articleService.getArticle().subscribe((article) => {
                  this.article = article.items.find(
                    (item: any) => item.materialId === this.materialId
                  );
                  if (this.article) {
                    this.material = {
                      article: this.article,
                      material: this.urlMaterial,
                    };
                    this.materialAuthor(this.materialId);
                    this.createForm();
                    return;
                  }
                });
              });
            });
          });
      } else {
        this.material = history.state.material;
        this.materialId = history.state.material.material.id;
        this.materialAuthor(this.materialId);
        this.createForm();
      }
    });
  }

  createForm() {
    this.token = localStorage.getItem('Token');
    this.decodedToken = this.jwtService.getDecodedAccessToken(this.token);
    this.userId =
      this.decodedToken[
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
      ];
    this.borrowForm = this.formBuilder.group({
      selectedDate: [''],
      material: [this.material.material.id],
      user: [this.userId],
    });
  }

  popup() {
    this.borrow = !this.borrow;
  }
  borrowMaterial() {
    if (this.borrowForm.invalid) {
      console.error('Form geçersiz, lütfen tüm alanları doldurun.');
      return;
    }
    //oluşturulan formun içindeki verileri değişkene atama
    //içine tokendan kullanıcı id si ve seçime göre materyal eklendi
    //sadece iade tarihini kullanıcı seçecek
    let formData = this.borrowForm.value;
    
    this.borrowService.borrowMaterialService(formData).subscribe({
      next: (response) => {
        console.log('Ödünç alma işlemi gerçekleşti.');
        this.popup();
      },
      error: (error) => {
        console.error('Ödünç alma sırasında bir hata oluştu. ', error);
      }
    });
  }
  materialAuthor(materialId: any) {
    const date = new Date(this.material.material.publicationDate);
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
              const materialType = materialTypes.find(
                (veri) => veri.id === foundMaterialTypeId
              );
              if (materialType) {
                this.tur = materialType.name;
              } else {
                console.log('Material type not found.');
              }
            },
            (error) => {
              console.error('Error fetching material types:', error);
            }
          );
        } else {
          console.log('Material not found in the response.');
        }
      },
      (error) => {
        console.error('Error fetching category types:', error);
      }
    );
    this.materialAuthorService
      .getMaterialAuthors(materialId)
      .subscribe((response) => {
        this.materialAuthors = response;
        for (let materialAuthor of this.materialAuthors) {
          this.authorService
            .getAuthor(materialAuthor.authorId)
            .subscribe((authorArray) => {
              const author = authorArray[0];
              this.authors.push(author);
            });
        }
      });
    this.materialPublisherService
      .getMaterialPublisher(materialId)
      .subscribe((response) => {
        {
          this.materialPublishers = response;
          for (let materialPublisher of this.materialPublishers) {
            this.publisherService
              .getPublisher(materialPublisher.publisherId)
              .subscribe((publisherArray) => {
                const publisher = publisherArray[0];
                this.publishers.push(publisher);
              });
          }
        }
      });
  }
}
