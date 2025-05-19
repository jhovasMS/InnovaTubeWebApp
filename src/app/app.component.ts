import { Component, inject } from '@angular/core';
import { ListaVideosComponent } from './component/lista-videos/lista-videos.component';

@Component({
  selector: 'app-root',
  imports: [ListaVideosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  
}
