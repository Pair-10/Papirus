import { Component , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';


@Component({
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BookDetailComponent {

}
