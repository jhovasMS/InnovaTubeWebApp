import { Component, inject } from '@angular/core';
import { YoutubeService } from '../../service/youtube.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Video } from '../../model/video.model';
import { ItemVideo } from '../../model/itemvideo.model';

@Component({
  selector: 'app-lista-videos',
  imports: [CommonModule],
  templateUrl: './lista-videos.component.html',
  styleUrl: './lista-videos.component.css',
})
export class ListaVideosComponent {
  youtubeService = inject(YoutubeService);
  video: Video | null = null;
  private sanitizer = inject(DomSanitizer);
  private safeHTML: SafeHtml | null = null;
  numPagina: number = 1;
  btnPaginaAnterior: boolean = false;
  btnPaginaSiguiente: boolean = true;

  constructor() {
    this.youtubeService.obtenerVideos(undefined).subscribe((datos) => {
      this.video = datos;
    });
  }

  public obtenerVideo(item: ItemVideo): SafeHtml {
    this.safeHTML = this.sanitizer.bypassSecurityTrustHtml(
      item.player.embedHtml
    );
    return this.safeHTML;
  }

  public obtenerVideoAnterior() {
    if (this.video?.prevPageToken) {
      this.youtubeService
        .obtenerVideos(this.video?.prevPageToken)
        .subscribe((datos) => {
          this.video = datos;
        });
      this.numPagina--;
      if(this.numPagina===1){
        this.btnPaginaAnterior = false;
      }
      this.btnPaginaSiguiente = true;
    }
  }

  public obtenerVideoSiguiente() {
    if (this.video?.nextPageToken) {
      this.youtubeService
        .obtenerVideos(this.video?.nextPageToken)
        .subscribe((datos) => {
          this.video = datos;
        });
      this.numPagina++;
      this.btnPaginaAnterior = true;
    }else{
      this.btnPaginaSiguiente = false;
    }
  }
}
