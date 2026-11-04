import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ArticuloListComponent } from './components/articulo-list/articulo-list.component';
import { ArticuloFormComponent } from './components/articulo-form/articulo-form.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard, adminGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'articulos', component: ArticuloListComponent, canActivate: [authGuard] },
  { path: 'articulos/nuevo', component: ArticuloFormComponent, canActivate: [authGuard, adminGuard] },
  { path: 'articulos/editar/:id', component: ArticuloFormComponent, canActivate: [authGuard, adminGuard] },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}