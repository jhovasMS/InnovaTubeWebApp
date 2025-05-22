import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';
import { CredencialesUsuarioDTO } from '../../model/login.model';
import { extraerErroresIdentity } from '../../functions/extraerErroresIdentity';


@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public email: string = '';
  public password: string = '';
  private loginService = inject(LoginService);
  private router = inject(Router);
  errores: string[] = [];
  
  public loguear(){
    const credenciales: CredencialesUsuarioDTO = {
      email: this.email,
      password: this.password  
    };
    this.loginService.login(credenciales).subscribe(() =>{
      this.router.navigate(['/'])
    }, (error) => {
      const errores = extraerErroresIdentity(error);
      this.errores = errores;
    })
  }
}
