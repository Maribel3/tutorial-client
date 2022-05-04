import { NgModule,LOCALE_ID } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorListComponent } from './author/author-list/author-list.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { GameListComponent } from './game/game-list/game-list.component';
import { ClientListComponent } from './client/client-list/client-list.component';
import { LoanListComponent } from './loan/loan-list/loan-list.component';
import { registerLocaleData } from '@angular/common';



const routes: Routes = [
  /*Regla adicional con el path vacío para indicar
  que si no pone ruta, por defecto la página inicial 
  redirija al path /games*/
  {path: '',redirectTo:'/games', pathMatch:'full'},
  {path: 'categories', component: CategoryListComponent },
  {path: 'authors', component:AuthorListComponent},
  {path: 'games',component:GameListComponent},
  {path: 'clients', component:ClientListComponent},
  {path: 'loan', component:LoanListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  
  exports: [RouterModule]
})
export class AppRoutingModule { }
