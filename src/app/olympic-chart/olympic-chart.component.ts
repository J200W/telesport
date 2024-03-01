import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Observable, Subscription, of } from 'rxjs';
import country from '../core/models/Olympic';
import response from '../core/models/Response';
import { Color, ScaleType } from '@swimlane/ngx-charts';

/**
 * Composant représentant un graphique olympique.
 * Ce composant récupère les données du service olympique.
 * Il gère également la navigation vers une vue détaillée pour un pays sélectionné.
 * @example
 * <app-olympic-chart></app-olympic-chart>
 * 
 *
 */

@Component({
    selector: 'app-olympic-chart',
    templateUrl: './olympic-chart.component.html',
    styleUrls: ['./olympic-chart.component.scss'],
})
export class OlympicChartComponent {
    /**
     * Observable représentant la réponse du service olympique.
     *
     * @remarks
     * La réponse est de type 'response' et inclut des informations sur le statut et les données.
     *
     * @defaultValue
     * Observable d'une réponse vide : { statut: '', données: [] }.
     */
    public olympicsObs: Observable<response> = of({
        status: '',
        data: [],
    });

    /**
     * Tableau contenant des données formatées pour le graphique.
     *
     * @defaultValue
     * Un tableau vide.
     *
     */
    public data = Array();

    /**
     * Tuple représentant les dimensions de la vue du graphique.
     *
     * @defaultValue
     * [NaN, NaN]
     */
    public view: [number, number] = [NaN, NaN];

    /**
     * Indicateur de dégradé pour le graphique.
     *
     * @defaultValue
     * false
     */
    public gradient: boolean = false;

    /**
     * Indicateur d'affichage de la légende du graphique.
     *
     * @defaultValue
     * false
     */
    public showLegend: boolean = false;

    /**
     * Indicateur d'affichage des étiquettes du graphique.
     *
     * @defaultValue
     * true
     */
    public showLabels: boolean = true;

    /**
     * Indicateur de type de graphique (Doughnut).
     *
     * @defaultValue
     * false
     */
    public isDoughnut: boolean = false;

    /**
     * Indicateur d'éclatement des tranches du graphique.
     *
     * @defaultValue
     * false
     */
    public explodeSlices: boolean = false;

    /**
     * Position de la légende dans le graphique.
     *
     * @defaultValue
     * 'below'
     */
    public legendPosition: string = 'below';

    /**
     * Indicateur de suppression des étiquettes du graphique.
     *
     * @defaultValue
     * false
     */
    public trimLabels: boolean = false;

    /**
     * Schéma de couleurs pour le graphique.
     *
     * @defaultValue
     * {
     *   domain: ['#008000', '#FFAE42', '#ff0000', '#000000', '#0000FF'],
     *   group: ScaleType.Ordinal,
     *   selectable: true,
     *   name: 'Customer Usage',
     * }
     */
    public colorScheme: Color = {
        domain: ['#008000', '#FFAE42', '#ff0000', '#000000', '#0000FF'],
        group: ScaleType.Ordinal,
        selectable: true,
        name: 'Customer Usage',
    };

    /**
     * Souscription à l'observable olympics.
     *
     * @defaultValue
     * Une nouvelle instance de la classe Subscription.
     */
    private olympicsSubscription: Subscription = new Subscription();

    /**
     * Crée une instance de OlympicChartComponent.
     *
     * @param olympicService - Le service utilisé pour récupérer les données olympiques. @see OlympicService
     * @param router - Le routeur Angular pour la navigation. @see Router
     */
    constructor(
        private olympicService: OlympicService,
        private router: Router
    ) {
        this.olympicsObs = this.olympicService.getOlympics();
        this.olympicsSubscription = this.olympicsObs.subscribe((data) => {
            this.data = this.format_country(data.data);
            if (this.data.length < 1) {
                this.olympicsSubscription.unsubscribe();
            }
        });
    }

    /**
     * Calcule le nombre total de médailles pour un pays donné.
     *
     * @param country - Le pays pour lequel calculer le nombre total de médailles. ``` { id: number, country: string, participations: Array<participation> } ```
     * @returns Le nombre total de médailles pour le pays. ``` number ```
     * @private
     */
    private calc_total_medals(country: country) {
        return country.participations.reduce((acc, p) => {
            return acc + p.medalsCount;
        }, 0);
    }

    /**
     * Formate les données des pays pour le graphique.
     *
     * @param countries - Les pays à formater. ``` { id: number, country: string, participations: Array<participation> } ```
     * @returns Un tableau de données formatées pour le graphique. ``` { extra: { id: number }, name: string, value: number } ```
     * @private 
     */
    private format_country(countries: Array<country>) {
        return countries.map((c) => {
            return {
                extra: {
                    id: c.id,
                },
                name: c.country,
                value: this.calc_total_medals(c),
            };
        });
    }

    /**
     * Gère la sélection d'un point de données dans le graphique.
     *
     * @param data - Les données du point sélectionné.
     */
    onSelect(data: any): void {
        this.router.navigate(['/detail', data.extra.id]);
    }
}
