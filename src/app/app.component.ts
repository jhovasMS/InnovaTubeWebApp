import { Component, inject } from '@angular/core';
import { ListaVideosComponent } from './component/lista-videos/lista-videos.component';
import { MenuComponent } from "./component/menu/menu.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [MenuComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  
}
