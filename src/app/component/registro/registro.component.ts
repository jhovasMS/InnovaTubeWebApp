import { Component, inject } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';
import { extraerErroresIdentity } from '../../functions/extraerErroresIdentity';
import { CredencialesUsuarioDTO } from '../../model/login.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  imports: [FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  public email: string = '';
  public password: string = '';
  private loginService = inject(LoginService);
  private router = inject(Router);
  errores: string[] = [];
  
  public registrar(){
    const credenciales: CredencialesUsuarioDTO = {
      email: this.email,
      password: this.password  
    };
    this.loginService.registrar(credenciales).subscribe(() =>{
      this.router.navigate(['/']);
    }, (error) => {
      const errores = extraerErroresIdentity(error);
      this.errores = errores;
    })
  }

}
