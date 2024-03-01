import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetailComponent } from './pages/detail/detail.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

/**
 * Module de routage Angular pour l'application olympique.
 *
 * Ce module configure les routes de l'application, associant chaque chemin d'URL à un composant Angular correspondant.
 * Les composants utilisés sont `HomeComponent`, `DetailComponent` et `NotFoundComponent`.
 *
 * @example
 * ```typescript
 * import { AppRoutingModule } from './app-routing.module';
 *
 * @NgModule({
 *   imports: [AppRoutingModule],
 *   exports: [AppRoutingModule],
 * })
 * export class AppModule { }
 * ```
 */

/**
 * Configuration des routes pour l'application olympique.
 */
const routes: Routes = [
    {
        path: '', // home route
        component: HomeComponent,
    },
    {
        path: 'detail/:id', // detail route avec paramètre d'identifiant
        component: DetailComponent,
    },
    {
        path: '**', // wildcard route pour 404 page
        component: NotFoundComponent,
    },
    {
        path: 'error', // wildcard route pour 404 page
        component: NotFoundComponent,
    },
];

/**
 * Module Angular pour la configuration des routes de l'application.
 */
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
