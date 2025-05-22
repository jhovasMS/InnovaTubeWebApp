import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Video } from '../../model/video.model';
import { FavoritosYoutubeService } from '../../service/favoritos-youtube.service';
import { YoutubeService } from '../../service/youtube.service';
import { VideoFavorito } from '../../model/videofavorito.model';
import { ItemVideo } from '../../model/itemvideo.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-videos-favoritos',
  imports: [CommonModule],
  templateUrl: './videos-favoritos.component.html',
  styleUrl: './videos-favoritos.component.css',
})
export class VideosFavoritosComponent {
  private youtubeService = inject(YoutubeService);
  private favoritosYoutubeService = inject(FavoritosYoutubeService);
  video: Video | null = null;
  private sanitizer = inject(DomSanitizer);
  private safeHTML: SafeHtml | null = null;

  constructor() {
    this.obtenerVideosFavoritos();
  }

  public obtenerVideosFavoritos() {
    let videosFavoritos: VideoFavorito[];
    this.favoritosYoutubeService.obtenerVideosFavoritos().subscribe(
      (datos) => {
        videosFavoritos = datos;
      },
      (error) => {
        console.error('Ocurrio el siguiente error: ' + error);
      },
      () => {
        this.obtenerVideosPorIds(videosFavoritos);
      }
    );
  }

  public obtenerVideo(item: ItemVideo): SafeHtml {
    this.safeHTML = this.sanitizer.bypassSecurityTrustHtml(
      item.player.embedHtml
    );
    return this.safeHTML;
  }

  public obtenerVideosPorIds(videosFavoritos: VideoFavorito[]) {
    let videosIds: string[] = [];
    videosFavoritos.forEach((item) => {
      videosIds.push(item.idVideoYouTube);
    });
    this.youtubeService.obtenerVideosPorIds(videosIds).subscribe(
      (datos) => {
        this.video = datos;
      },
      (error) => {
        console.error('Ocurrio el siguiente error: ' + error);
      }
    );
  }

  public elminarDeFavoritos(item: ItemVideo) {
    this.favoritosYoutubeService.eliminarVideoFavorito(item.id).subscribe(
      () => {
        alert('El video se eliminó correctamente de los videos favoritos');
        this.obtenerVideosFavoritos();
      },
      (error) => {
        console.error('Ocurrio el siguiente error: ' + error);
      }
    );
  }
}
