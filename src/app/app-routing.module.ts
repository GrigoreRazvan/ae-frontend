import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponentComponent } from './login-component/login-component.component';
import { ProdusNouComponent } from './produs-nou/produs-nou.component';
import { ProduseComponent } from './produse/produse.component';

const routes: Routes = [
  {path:'login', component:LoginComponentComponent},
  {path:'', component:ProduseComponent},
  {path:'produs-nou', component:ProdusNouComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
