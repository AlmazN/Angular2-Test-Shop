import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

export const APP_ROUTES: Routes = [
    {
        path: 'home', 
        component: HomeComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }
];