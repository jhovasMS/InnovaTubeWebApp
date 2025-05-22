import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-menu',
  imports: [RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  private loginService = inject(LoginService);
  private router = inject(Router);
  estaLogueado: boolean = false;

  ngOnInit(){
    this.estaLogueado = this.loginService.estaLogueado();
  }

  logout(){
    this.loginService.logout();
    this.estaLogueado = false;
    this.router.navigate(['/']);
  }
}
