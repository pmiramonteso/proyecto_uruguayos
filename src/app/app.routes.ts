import { Routes } from '@angular/router';
import { adminGuard } from './auth/admin.guard';

import { PanelAdministracionComponent } from './componentes/admin/panel-administracion/panel-administracion.component';
import { LoginComponent } from './componentes/usuario/login/login.component';
import { RegistroComponent } from './componentes/usuario/registro/registro.component';

import { BienvenidaComponent } from './componentes/bienvenida/bienvenida.component';
import { HomeComponent } from './componentes/home/home.component';
import { CalendarioComponent } from './componentes/calendario/calendario.component';
import { GraficosComponent } from './componentes/graficos/graficos.component';
import { MapaComponent } from './componentes/mapa/mapa.component';



export const routes: Routes = [
    { path: 'admin', component: PanelAdministracionComponent, canActivate: [adminGuard], data: { roles: ['admin']}},
    { path: 'login', component: LoginComponent},
    { path: 'registro', component: RegistroComponent},
    { path: 'bienvenida', component: BienvenidaComponent},
    { path: 'home', component: HomeComponent},
    { path: 'calendario', component: CalendarioComponent},
    { path: 'graficos', component: GraficosComponent},
    { path: 'mapa', component: MapaComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home' }
];
