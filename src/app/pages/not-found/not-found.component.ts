import { Component, OnInit } from '@angular/core';

/**
 * Composant Angular représentant la page 404 (introuvable).
 *
 * Ce composant est utilisé pour afficher une page 404 lorsque l'URL demandée n'est pas trouvée.
 *
 * @example
 * <app-not-found></app-not-found>
 *
 */
@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
    /**
     * Crée une instance de NotFoundComponent.
     */
    constructor() {}

    /**
     * Crochet de cycle de vie Angular appelé après l'initialisation du composant.
     *
     * @remarks
     * Ce crochet de cycle de vie est généralement utilisé pour effectuer des initialisations après la création du composant.
     * Dans ce cas, il n'y a pas d'initialisation spécifique définie.
     */
    ngOnInit(): void {}
}
