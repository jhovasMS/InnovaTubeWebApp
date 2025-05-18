import { Component, inject } from '@angular/core';
import { YoutubeService } from '../youtube.service';
import { Video } from './video.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Item } from './item.model';

@Component({
  selector: 'app-lista-videos',
  imports: [],
  templateUrl: './lista-videos.component.html',
  styleUrl: './lista-videos.component.css'
})
export class ListaVideosComponent {
    youtubeService = inject(YoutubeService);
  video: Video | null = null;
  private sanitizer = inject(DomSanitizer);
  safeHTML: SafeHtml | undefined;

  constructor() {
    this.youtubeService.obtenerVideos().subscribe(datos => {
      this.video = datos;
      //console.log(this.video);
    });
  }

  obtenerVideo(item: Item){
    this.safeHTML = this.sanitizer.bypassSecurityTrustHtml(item.player.embedHtml); 
    return this.safeHTML;
  }
}
