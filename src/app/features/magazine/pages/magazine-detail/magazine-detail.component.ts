import { Component ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommentComponent } from '../../../comment/components/comment/comment.component';
import { MagazineComponent } from '../../components/magazine/magazine.component';
import { RecommendedMaterialsComponent } from '../../../recommendedMaterials/components/recommended-materials/recommended-materials.component';

@Component({
  //selector: 'app-magazine-detail',
  standalone: true,
  imports: [RouterOutlet,RouterLink,CommentComponent,MagazineComponent,RecommendedMaterialsComponent],
  templateUrl: './magazine-detail.component.html',
  styleUrl: './magazine-detail.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MagazineDetailComponent {

}
