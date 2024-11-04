import { Routes } from '@angular/router';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { HomeComponent } from './home/home.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { GraficosComponent } from './graficos/graficos.component';
import { MapaComponent } from './mapa/mapa.component';


export const routes: Routes = [
    { path: 'bienvenida', component: BienvenidaComponent},
    { path: 'home', component: HomeComponent},
    { path: 'calendario', component: CalendarioComponent},
    { path: 'graficos', component: GraficosComponent},
    { path: 'mapa', component: MapaComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home' }
];
