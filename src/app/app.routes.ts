import { Routes } from '@angular/router';
import { BienvenidaComponent } from './componentes/bienvenida/bienvenida.component';
import { HomeComponent } from './componentes/home/home.component';
import { CalendarioComponent } from './componentes/calendario/calendario.component';
import { GraficosComponent } from './componentes/graficos/graficos.component';
import { MapaComponent } from './componentes/mapa/mapa.component';


export const routes: Routes = [
    { path: 'bienvenida', component: BienvenidaComponent},
    { path: 'home', component: HomeComponent},
    { path: 'calendario', component: CalendarioComponent},
    { path: 'graficos', component: GraficosComponent},
    { path: 'mapa', component: MapaComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home' }
];
