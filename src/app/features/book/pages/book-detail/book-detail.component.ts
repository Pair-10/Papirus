import { Component , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommentComponent } from '../../../comment/components/comment/comment.component';
import { BookComponent } from '../../components/book/book.component';
import { RecommendedMaterialsComponent } from '../../../recommendedMaterials/components/recommended-materials/recommended-materials.component';


@Component({
  standalone: true,
  imports: [RouterOutlet,RouterLink,CommentComponent,BookComponent,RecommendedMaterialsComponent],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BookDetailComponent {

}
