import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommentComponent } from '../../../comment/components/comment/comment.component';
import { BookComponent } from '../../../book/components/book/book.component';

@Component({
  selector: 'app-material-detail',
  standalone: true,
  imports: [RouterOutlet,RouterLink,CommentComponent,BookComponent],
  templateUrl: './material-detail.component.html',
  styleUrl: './material-detail.component.css'
})
export class MaterialDetailComponent {

}
