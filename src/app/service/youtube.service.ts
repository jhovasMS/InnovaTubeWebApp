import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Video } from '../model/video.model';
import { Search } from '../model/search.model';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private http = inject(HttpClient);
  private urlBase = environment.youtubeAPI;
  private searchUrlBase = environment.youtubeAPIkey + '/search?key=' + environment.youtubeAPIkey + '&regionCode=MX&type=video&part=snippet&maxResults=5&q=surfing'

  constructor() { }

  public obtenerVideos(pageToken: string | undefined): Observable<Video> {
    let videoUrlBase = this.urlBase + '/videos?key=' + environment.youtubeAPIkey + '&regionCode=MX&chart=mostPopular&part=player%2Cstatistics%2Csnippet';
    if(pageToken){
      const nuevaUrlBase: string = videoUrlBase + '&pageToken=' + pageToken;
      return this.http.get<Video>(nuevaUrlBase);
    }
    return this.http.get<Video>(videoUrlBase);
  }

  public obtenerBusqueda(palabraClave: string, pageToken: string | undefined): Observable<Search> {
    let searchUrlBase = this.urlBase + '/videos?key=' + environment.youtubeAPIkey + '&regionCode=MX&chart=mostPopular&regionCode=MX&type=video&part=snippet&maxResults=5&q=' + palabraClave;
    // if(pageToken){
    //   const nuevaUrlBase: string = videoUrlBase + '&pageToken=' + pageToken;
    //   return this.http.get<Video>(nuevaUrlBase);
    // }
    return this.http.get<Search>(searchUrlBase);
  }
}
