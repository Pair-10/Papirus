import { Component } from '@angular/core';
import { HerosectionComponent } from '../herosection/herosection.component';
import { HighlightsComponent } from '../highlights/highlights.component';
import { ActiviesComponent } from '../activies/activies.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HerosectionComponent, HighlightsComponent, ActiviesComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
