import { Component ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ArticleComponent } from '../../components/article/article.component';
import { RecommendedMaterialsComponent } from '../../../recommendedMaterials/components/recommended-materials/recommended-materials.component';
import { CommentComponent } from '../../../comment/components/comment/comment.component';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [RouterOutlet,RouterLink,ArticleComponent,RecommendedMaterialsComponent,CommentComponent],
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ArticleDetailComponent {

}
