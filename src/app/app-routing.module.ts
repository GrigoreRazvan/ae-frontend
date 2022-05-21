import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BonComponent } from './bon/bon.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { MasaComponent } from './masa/masa.component';
import { MeniuPrincipalComponent } from './meniu-principal/meniu-principal.component';
import { ProdusNouComponent } from './produs-nou/produs-nou.component';

const routes: Routes = [
  {path:'', component:LoginComponentComponent},
  {path:'meniu/principal', component:MeniuPrincipalComponent},
  {path:'meniu/masa/:id', component:MasaComponent},
  {path:'meniu/masa/:id/bon',component:BonComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
