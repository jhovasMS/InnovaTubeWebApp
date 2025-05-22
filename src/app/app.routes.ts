import { Routes } from '@angular/router';
import { ListaVideosComponent } from './component/lista-videos/lista-videos.component';
import { VideosFavoritosComponent } from './component/videos-favoritos/videos-favoritos.component';
import { NoEncontradoComponent } from './component/no-encontrado/no-encontrado.component';
import { LoginComponent } from './component/login/login.component';
import { LoginGuardianService } from './service/login-guardian.service';
import { RegistroComponent } from './component/registro/registro.component';

export const routes: Routes = [
    {path: '', component: ListaVideosComponent},
    {path: 'videosfavoritos', component: VideosFavoritosComponent, canActivate: [LoginGuardianService]},
    {path: 'login', component: LoginComponent},
    {path: 'registro', component: RegistroComponent},
    {path: '**', component: NoEncontradoComponent}
];
