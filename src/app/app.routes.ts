import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'gis',
        pathMatch: 'full'
    },
    {
        path: 'gis',
        loadComponent: () => import('./pages/gis-page/gis-page').then(m => m.GisPage)
    },

];
