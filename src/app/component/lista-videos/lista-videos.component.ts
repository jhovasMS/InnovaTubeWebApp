import { Component, inject } from '@angular/core';
import { YoutubeService } from '../../service/youtube.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Video } from '../../model/video.model';
import { ItemVideo } from '../../model/itemvideo.model';
import { FormsModule, NgForm } from '@angular/forms';
import { Search } from '../../model/search.model';
import { FavoritosYoutubeService } from '../../service/favoritos-youtube.service';
import { VideoFavoritoCreacion } from '../../model/videofavorito.model';

@Component({
  selector: 'app-lista-videos',
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-videos.component.html',
  styleUrl: './lista-videos.component.css',
})
export class ListaVideosComponent {
  private youtubeService = inject(YoutubeService);
  private favoritosYoutubeService = inject(FavoritosYoutubeService);
  video: Video | null = null;
  private sanitizer = inject(DomSanitizer);
  private safeHTML: SafeHtml | null = null;
  numPagina: number = 0;
  btnPaginaAnterior: boolean | null = null;
  btnPaginaSiguiente: boolean | null = null;
  private search: Search | null = null;
  palabraClave: string | null = null;
  palabraClaveTemp: string | null = null;

  constructor() {
    this.obtenerVideos();
  }

  public obtenerVideos() {
    this.youtubeService.obtenerVideos(undefined).subscribe(
      (datos) => {
        this.video = datos;
      },
      (error) => {
        alert('Ocurrio el siguiente error: ' + error);
      },
      () => {
        if (this.video) {
          this.numPagina = 1;
          this.btnPaginaAnterior = false;
          this.btnPaginaSiguiente = true;
          this.search = null;
        }
      }
    );
  }

  public obtenerVideo(item: ItemVideo): SafeHtml {
    this.safeHTML = this.sanitizer.bypassSecurityTrustHtml(
      item.player.embedHtml
    );
    return this.safeHTML;
  }

  public obtenerVideosAnteriores() {
    if (!this.search) {
      if (this.video?.prevPageToken) {
        this.youtubeService.obtenerVideos(this.video?.prevPageToken).subscribe(
          (datos) => {
            this.video = datos;
          },
          (error) => {
            alert('Ocurrio el siguiente error: ' + error);
          },
          () => {
            if (this.video) {
              this.numPagina--;
              if (this.numPagina === 1) {
                this.btnPaginaAnterior = false;
              }
              this.btnPaginaSiguiente = true;
            }
          }
        );
      }
    } else {
      if (this.search.prevPageToken && this.palabraClave) {
        this.youtubeService
          .buscarVideos(this.palabraClave, this.search.prevPageToken)
          .subscribe(
            (datos) => {
              this.search = datos;
            },
            (error) => {
              alert('Ocurrio el siguiente error: ' + error);
            },
            () => {
              if (this.search) {
                console.log(this.search);
                this.obtenerVideosPorIds(this.search);
                this.numPagina--;
                if (this.numPagina === 1) {
                  this.btnPaginaAnterior = false;
                }
                this.btnPaginaSiguiente = true;
              }
            }
          );
      } else if (this.search.prevPageToken && !this.palabraClave) {
        alert(
          'No se puede completar la transacción porque no hay un texto de búsqueda'
        );
        this.obtenerVideos();
      }
    }
  }

  public obtenerVideosSiguientes() {
    if (!this.search) {
      if (this.video?.nextPageToken) {
        this.youtubeService.obtenerVideos(this.video?.nextPageToken).subscribe(
          (datos) => {
            this.video = datos;
          },
          (error) => {
            alert('Ocurrio el siguiente error: ' + error);
          },
          () => {
            if (this.video) {
              this.numPagina++;
              this.btnPaginaAnterior = true;
            }
          }
        );
      } else {
        this.btnPaginaSiguiente = false;
      }
    } else {
      if (this.search.nextPageToken && this.palabraClave) {
        this.youtubeService
          .buscarVideos(this.palabraClave, this.search.nextPageToken)
          .subscribe(
            (datos) => {
              this.search = datos;
            },
            (error) => {
              alert('Ocurrio el siguiente error: ' + error);
            },
            () => {
              if (this.search) {
                console.log(this.search);
                this.obtenerVideosPorIds(this.search);
                this.numPagina++;
                this.btnPaginaAnterior = true;
              }
            }
          );
      } else if (this.search.nextPageToken && !this.palabraClave) {
        alert(
          'No se puede completar la transacción porque no hay un texto de búsqueda'
        );
        this.obtenerVideos();
      } else if (!this.search.nextPageToken && this.palabraClave) {
        this.btnPaginaSiguiente = false;
      } else {
        alert(
          'No se puede completar la transacción porque no hay un texto de búsqueda'
        );
        this.obtenerVideos();
      }
    }
  }

  public buscarVideos() {
    if (this.palabraClaveTemp) {
      this.palabraClave = this.palabraClaveTemp;
      this.youtubeService.buscarVideos(this.palabraClave, undefined).subscribe(
        (datos) => {
          this.search = datos;
        },
        (error) => {
          alert('Ocurrio el siguiente error: ' + error);
        },
        () => {
          if (this.search) {
            console.log(this.search);
            this.obtenerVideosPorIds(this.search);
            this.numPagina = 1;
            this.btnPaginaAnterior = false;
            this.btnPaginaSiguiente = true;
          } else {
            alert('No se obtuvieron resultados');
          }
        }
      );
    }
  }

  public obtenerVideosPorIds(search: Search) {
    let videosIds: string[] = [];
    search?.items.forEach((item) => {
      videosIds.push(item.id.videoId);
    });
    this.youtubeService.obtenerVideosPorIds(videosIds).subscribe(
      (datos) => {
        this.video = datos;
      },
      (error) => {
        alert('Ocurrio el siguiente error: ' + error);
      }
    );
  }

  public agregarEnFavoritos(item: ItemVideo) {
    const videoFavorito: VideoFavoritoCreacion = {
      idVideoYouTube: item.id
    };
    this.favoritosYoutubeService.agregarVideoFavorito(videoFavorito).subscribe(
      () => {
        alert('El video se agregó correctamente a los videos favoritos');
      },
      (error) => {
        alert('Ocurrio el siguiente error: ' + error);
      }
    );
  }
}
