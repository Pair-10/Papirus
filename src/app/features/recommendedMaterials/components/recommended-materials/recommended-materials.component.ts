import { Component , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-recommended-materials',
  standalone: true,
  imports: [RouterOutlet,RouterLink,],
  templateUrl: './recommended-materials.component.html',
  styleUrl: './recommended-materials.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RecommendedMaterialsComponent {

}
