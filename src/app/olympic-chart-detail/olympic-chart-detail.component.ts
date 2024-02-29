import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';
import country from '../core/models/Olympic';
import response from '../core/models/Response';
import serie from '../core/models/Serie';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { OlympicService } from '../core/services/olympic.service';

/**
 * Composant représentant un graphique plus détaillé pour un pays.
 *
 * @example
 * <app-olympic-chart-detail></app-olympic-chart-detail>
 *
 * @remarks
 * Ce composant suppose l'utilisation du service OlympicService pour la récupération des données et dépend de ngx-charts pour la visualisation du graphique.
 *
 */

@Component({
    selector: 'app-olympic-chart-detail',
    templateUrl: './olympic-chart-detail.component.html',
    styleUrls: ['./olympic-chart-detail.component.scss'],
})
export class OlympicChartDetailComponent {
    /**
     * Objet représentant les informations du pays actuel.
     *
     * @defaultValue
     * { id: 0, country: "", participations: [] }
     */
    private country: country = {
        id: 0,
        country: '',
        participations: [],
    };

    /**
     * Observable représentant la réponse du service olympique.
     *
     * @remarks
     * La réponse est de type 'response' et inclut des informations sur le statut et les données.
     *
     * @defaultValue
     * Observable d'une réponse vide : { statut: '', données: [] }.
     */
    public olympics: Observable<response> = of({
        status: '',
        data: [],
    });

    /**
     * Tableau contenant la série de données pour le graphique.
     *
     * @defaultValue
     * [
     *   {
     *     name: 'Country',
     *     series: [],
     *   },
     * ]
     */
    public serie: Array<serie> = [
        {
            name: 'Country',
            series: [],
        },
    ];

    /**
     * Indicateur d'affichage de la légende du graphique.
     *
     * @defaultValue
     * false
     */
    showLegend: boolean = false;

    /**
     * Indicateur d'affichage des étiquettes du graphique.
     *
     * @defaultValue
     * true
     */
    showLabels: boolean = true;

    /**
     * Indicateur d'animation du graphique.
     *
     * @defaultValue
     * true
     */
    animations: boolean = true;

    /**
     * Indicateur d'affichage de l'axe des x du graphique.
     *
     * @defaultValue
     * true
     */
    xAxis: boolean = true;

    /**
     * Indicateur d'affichage de l'axe des y du graphique.
     *
     * @defaultValue
     * true
     */
    yAxis: boolean = true;

    /**
     * Indicateur d'affichage de l'étiquette de l'axe des y du graphique.
     *
     * @defaultValue
     * true
     */
    showYAxisLabel: boolean = true;

    /**
     * Indicateur d'affichage de l'étiquette de l'axe des x du graphique.
     *
     * @defaultValue
     * true
     */
    showXAxisLabel: boolean = true;

    /**
     * Étiquette de l'axe des x du graphique.
     *
     * @defaultValue
     * 'Dates'
     */
    xAxisLabel: string = 'Dates';

    /**
     * Étiquette de l'axe des y du graphique.
     *
     * @defaultValue
     * 'Medals'
     */
    yAxisLabel: string = 'Medals';

    /**
     * Indicateur d'affichage de la chronologie du graphique.
     *
     * @defaultValue
     * true
     */
    timeline: boolean = true;

    /**
     * Schéma de couleurs pour le graphique.
     *
     * @defaultValue
     * {
     *   domain: ['#39818d'],
     *   group: ScaleType.Ordinal,
     *   selectable: true,
     *   name: 'Customer Usage',
     * }
     */
    colorScheme: Color = {
        domain: ['#39818d'],
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
    private olympicsSubscription = new Subscription();

    /**
     * Crée une instance de OlympicChartDetailComponent.
     *
     * @param olympicService - Le service utilisé pour récupérer les données olympiques.
     * @param router - Le routeur Angular pour la navigation.
     */
    constructor(
        private olympicService: OlympicService,
        private router: Router
    ) {}

    /**
     * Crochet de cycle de vie Angular appelé après l'initialisation du composant.
     *
     * @remarks
     * Récupère l'ID du pays à partir de l'URL, récupère les données du service olympique et formate la série de données pour le graphique.
     * Vérifie les erreurs dans la réponse et navigue vers la page d'erreur si nécessaire.
     */
    ngOnInit(): void {
        const id = parseInt(window.location.pathname.split('/').pop() || '0');
        if (Number.isNaN(id) || id === 0) {
            this.router.navigate(['/error']);
            return;
        }
        this.olympics = this.olympicService.getOlympics();
        this.olympicsSubscription = this.olympics.subscribe((data) => {
            if (data.status === 'error') {
                this.router.navigate(['/error']);
                this.olympicsSubscription.unsubscribe();
                return;
            }
            this.country = data.data.find((c) => c.id === id) || {
                id: 0,
                country: '',
                participations: [],
            };
            console.log('Country: ', this.country);
            if (this.country.id === 0) {
                this.router.navigate(['/error']);
                this.olympicsSubscription.unsubscribe();
                return;
            }
            this.serie = this.format_serie(this.country);
        });
    }

    /**
     * Formate les données du pays en une série de données pour le graphique.
     *
     * @param country - Les données du pays à formater.
     * @returns La série de données formatée pour le graphique.
     * @private
     */
    private format_serie(country: country) {
        return [
            {
                name: country.country,
                series: country.participations.map((p) => {
                    return {
                        name: p.year.toString(),
                        value: p.medalsCount,
                    };
                }),
            },
        ];
    }
}
