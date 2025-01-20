import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { HomeComponent } from './pages/home/home.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';

export const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'registro', component: RegistroComponent},
    { path: 'home', component: HomeComponent },
    { path: 'home/:id', component: HomeComponent },
    {path: 'categorias', component: CategoriasComponent},
    {path: 'categorias/:id', component: CategoriasComponent}


];
