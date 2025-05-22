import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import {
  CredencialesUsuarioDTO,
  RespuestaAutenticaciónDTO,
} from '../model/login.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { EventEmitter } from 'stream';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private http = inject(HttpClient);
  private urlBase = environment.favoritosYoutubeAPI + '/api/usuarios';
  private readonly llaveToken = 'token';
  private readonly llaveExpiracion = 'token-expiracion';
  private loggedIn = new BehaviorSubject<boolean>(false);

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

  private guardarToken(respuestaAutenticacionDTO: RespuestaAutenticaciónDTO) {
    localStorage.setItem(this.llaveToken, respuestaAutenticacionDTO.token);
    localStorage.setItem(
      this.llaveExpiracion,
      respuestaAutenticacionDTO.expiracion.toString()
    );
    this.loggedIn.next(true);
  }

  public estaLogueado(): Observable<boolean> {
    this.loggedIn.next(this.validarToken());
    return this.loggedIn.asObservable();
  }

  private validarToken(): boolean {
    let isLocalStorageAvailable = typeof localStorage !== 'undefined';
    if (isLocalStorageAvailable) {
      const token = localStorage.getItem(this.llaveToken);
      if (!token) {
        console.log('No hay token');
        return false;
      }

      const expiracion = localStorage.getItem(this.llaveExpiracion)!;
      const expiracionFecha = new Date(expiracion);

      if (expiracionFecha <= new Date()) {
        console.log('token expiro');
        this.logout();
        return false;
      }
      console.log('Si hay token');
      return true;
    } else {
      console.log('No existe nada en local store');
      return false;
    }
  }

  public logout() {
    localStorage.removeItem(this.llaveToken);
    localStorage.removeItem(this.llaveExpiracion);
    this.loggedIn.next(false);
  }
}
