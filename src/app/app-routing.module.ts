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
 * // Exemple d'utilisation dans un fichier de configuration d'application Angular :
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
        path: '',
        component: HomeComponent,
    },
    {
        path: 'detail/:id',
        component: DetailComponent,
    },
    {
        path: '**',
        component: NotFoundComponent,
    },
    {
        path: 'error',
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
