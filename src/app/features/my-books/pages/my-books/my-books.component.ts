import { Component } from '@angular/core';
import { SidebarComponent } from "../../../../shared/components/sidebar/sidebar.component";

@Component({
    selector: 'app-my-books',
    standalone: true,
    templateUrl: './my-books.component.html',
    styleUrl: './my-books.component.css',
    imports: [SidebarComponent]
})
export class MyBooksComponent {

}
