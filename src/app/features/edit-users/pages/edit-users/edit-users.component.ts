import { Component } from '@angular/core';
import { SidebarComponent } from "../../../../shared/components/sidebar/sidebar.component";

@Component({
    selector: 'app-edit-users',
    standalone: true,
    templateUrl: './edit-users.component.html',
    styleUrl: './edit-users.component.css',
    imports: [SidebarComponent]
})
export class EditUsersComponent {

}
