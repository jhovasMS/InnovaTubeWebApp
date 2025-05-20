import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { VideoFavorito, VideoFavoritoCreacion } from '../model/videofavorito.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritosYoutubeService {
  private http = inject(HttpClient);
  private urlBaseFavoritosYouTube = environment.favoritosYoutubeAPI;

  constructor() { }

  public agregarVideoFavorito(videoFavorito: VideoFavoritoCreacion) {
    let videoFavoritoUrlBase = this.urlBaseFavoritosYouTube + '/api/videosfavoritos';
    return this.http.post(videoFavoritoUrlBase, videoFavorito);
  }

  public obtenerVideosFavoritos(): Observable<VideoFavorito[]> {
    let videoFavoritoUrlBase = this.urlBaseFavoritosYouTube + '/api/videosfavoritos';
    return this.http.get<VideoFavorito[]>(videoFavoritoUrlBase);
  }

  public eliminarVideoFavorito(idVideoYouTube: string){
    let videoFavoritoUrlBase = this.urlBaseFavoritosYouTube + '/api/videosfavoritos';
    return this.http.delete(`${videoFavoritoUrlBase}/${idVideoYouTube}`);
  }
}
