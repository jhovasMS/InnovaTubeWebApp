export interface CredencialesUsuarioDTO {
    email: string;
    password: string;
}

export interface RespuestaAutenticaciónDTO{
    token: string;
    expiracion: Date;
}