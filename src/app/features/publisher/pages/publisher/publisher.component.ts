import { Component } from '@angular/core';

import { TablePublisherComponent } from '../../components/table-publisher/table-publisher.component';

import { FormPublisherComponent } from '../../components/forms/form-publisher/form-publisher.component';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';
@Component({
  selector: 'app-publisher',
  standalone: true,
  imports: [SidebarComponent,FormPublisherComponent,TablePublisherComponent],
  templateUrl: './publisher.component.html',
  styleUrl: './publisher.component.css'
})
export class PublisherComponent {

}
