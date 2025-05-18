import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';
import { Video } from './lista-videos/video.model';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  
  constructor() { }

  private http = inject(HttpClient);
  private urlBase = environment.youtubeAPI + '/videos?key=AIzaSyBBIXCnoxx75mCcPud8afLCkjZJBkJWPis&regionCode=MX&chart=mostPopular&part=player%2Cstatistics';

  public obtenerVideos(){
    return this.http.get<Video>(this.urlBase);
  }
}
