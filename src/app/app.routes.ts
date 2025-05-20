import { Routes } from '@angular/router';
import { ListaVideosComponent } from './component/lista-videos/lista-videos.component';
import { VideosFavoritosComponent } from './component/videos-favoritos/videos-favoritos.component';
import { NoEncontradoComponent } from './component/no-encontrado/no-encontrado.component';

export const routes: Routes = [
    {path: '', component: ListaVideosComponent},
    {path: 'videosfavoritos', component: VideosFavoritosComponent},
    {path: '**', component: NoEncontradoComponent}
];
