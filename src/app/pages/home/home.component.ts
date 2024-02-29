import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import country from 'src/app/core/models/Olympic';

/**
 * Composant Angular représentant la page d'accueil affichant les informations sur les pays participant aux Jeux olympiques.
 *
 * Ce composant affiche une liste de pays avec leurs données olympiques sur la page d'accueil.
 *
 * @example
 * <app-home></app-home>
 *
 * @beta
 */
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    /**
     * Observable représentant la liste des pays avec leurs données olympiques.
     *
     * @remarks
     * L'observable est de type 'country[]' et représente la liste des pays avec leurs informations.
     *
     * @defaultValue
     * Observable d'une liste vide de pays : [].
     */
    public olympics: Observable<country[]> = of([]);

    /**
     * Crée une instance de HomeComponent.
     */
    constructor() {}

    /**
     * Crochet de cycle de vie Angular appelé après l'initialisation du composant.
     *
     * @remarks
     * Ce crochet de cycle de vie est généralement utilisé pour effectuer des initialisations après la création du composant.
     * Dans ce cas, il n'y a pas d'initialisation spécifique définie.
     */
    ngOnInit(): void {
        // Aucune initialisation spécifique définie ici.
    }
}
