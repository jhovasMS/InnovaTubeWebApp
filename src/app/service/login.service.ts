import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import {
  CredencialesUsuarioDTO,
  RespuestaAutenticaciónDTO,
} from '../model/login.model';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private http = inject(HttpClient);
  private urlBase = environment.favoritosYoutubeAPI + '/api/usuarios';
  private readonly llaveToken = 'token';
  private readonly llaveExpiracion = 'token-expiracion';

  constructor() {}

  public registrar(
    credenciales: CredencialesUsuarioDTO
  ): Observable<RespuestaAutenticaciónDTO> {
    return this.http
      .post<RespuestaAutenticaciónDTO>(
        `${this.urlBase}/registrar`,
        credenciales
      )
      .pipe(
        tap((respuestaAutenticaciónDTO) =>
          this.guardarToken(respuestaAutenticaciónDTO)
        )
      );
  }

  public login(
    credenciales: CredencialesUsuarioDTO
  ): Observable<RespuestaAutenticaciónDTO> {
    return this.http
      .post<RespuestaAutenticaciónDTO>(`${this.urlBase}/login`, credenciales)
      .pipe(
        tap((respuestaAutenticaciónDTO) =>
          this.guardarToken(respuestaAutenticaciónDTO)
        )
      );
  }

  guardarToken(respuestaAutenticacionDTO: RespuestaAutenticaciónDTO) {
    localStorage.setItem(this.llaveToken, respuestaAutenticacionDTO.token);
    localStorage.setItem(
      this.llaveExpiracion,
      respuestaAutenticacionDTO.expiracion.toString()
    );
  }

  estaLogueado(): boolean {
    let isLocalStorageAvailable = typeof localStorage !== 'undefined';
    if(isLocalStorageAvailable){
      const token = localStorage.getItem(this.llaveToken);
    if (!token) {
      return false;
    }

    const expiracion = localStorage.getItem(this.llaveExpiracion)!;
    const expiracionFecha = new Date(expiracion);

    if (expiracionFecha <= new Date()) {
      this.logout();
      return false;
    }

    return true;
    }else{
      return false;
    }
  }

  public logout() {
    localStorage.removeItem(this.llaveToken);
    localStorage.removeItem(this.llaveExpiracion);
  }
}
