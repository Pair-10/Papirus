import { Component } from '@angular/core';
import { HerosectionComponent } from '../herosection/herosection.component';
import { HighlightsComponent } from '../highlights/highlights.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HerosectionComponent, HighlightsComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
