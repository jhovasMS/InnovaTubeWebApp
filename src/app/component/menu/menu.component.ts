import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { map, take } from 'rxjs';

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
    this.loginService.estaLogueado().subscribe((estaLogueado:boolean)=>{
      this.estaLogueado = estaLogueado;
    },()=>{
      if(!this.estaLogueado){
        this.estaLogueado = false;
      }  
      this.estaLogueado = true;  
    });
  }

  logout(){
    this.loginService.logout();
    //this.estaLogueado = false;
    this.router.navigate(['/']);
  }
}
