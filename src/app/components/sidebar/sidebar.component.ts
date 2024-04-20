import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
   @Input() icerik: string = '';
   @Output() veriGonderme: EventEmitter<string> = new EventEmitter<string>();


  viewContent(icerikAdi: string) {
    this.icerik = icerikAdi;
    this.veriGonderme.emit(this.icerik)
    console.log(this.icerik)
  }
  
}
