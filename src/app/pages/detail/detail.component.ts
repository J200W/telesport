import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import country from 'src/app/core/models/Olympic';
import response from 'src/app/core/models/Response';
import dataCountry from 'src/app/core/models/DataCountry';
import { Router } from '@angular/router';

/**
 * Composant Angular représentant les détails d'un pays spécifique pour les Jeux olympiques.
 *
 * Ce composant récupère les données du service olympique et affiche les détails d'un pays, y compris le nombre de participations, de médailles et d'athlètes.
 *
 * @example
 * <app-detail></app-detail>
 *
 * @remarks
 * Ce composant dépend du service OlympicService pour récupérer les données olympiques.
 *
 * @beta
 */
@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
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
     * Identifiant du pays actuel.
     *
     * @defaultValue
     * 0
     * @private
     */
    private id: number = 0;

    /**
     * Objet représentant les informations du pays actuel.
     *
     * @defaultValue
     * { id: 0, country: "", participations: [] }
     * @private
     */
    private country: country = {
        id: 0,
        country: '',
        participations: [],
    };

    /**
     * Objet représentant les données du pays actuel, y compris le nombre de participations, de médailles et d'athlètes.
     *
     * @defaultValue
     * { numberOfParticipations: 0, numberOfMedals: 0, numberOfAthletes: 0 }
     * @private
     */
    private data: dataCountry = {
        numberOfParticipations: 0,
        numberOfMedals: 0,
        numberOfAthletes: 0,
    };

    /**
     * Abonnement à l'observable olympics.
     *
     * @defaultValue
     * Une nouvelle instance de la classe Subscription.
     * @private
     */
    private olympicsSubscription = new Subscription();

    /**
     * Crée une instance de DetailComponent.
     *
     * @param olympicService - Le service utilisé pour récupérer les données olympiques.
     * @param router - Le routeur Angular pour la navigation.
     */
    constructor(
        private olympicService: OlympicService,
        private router: Router
    ) {}

    /**
     * Formatte les données du pays pour obtenir le nombre de participations, de médailles et d'athlètes.
     *
     * @returns Les données formatées du pays.
     * @private
     */
    private formatData(): dataCountry {
        return {
            numberOfParticipations: this.country.participations.length,
            numberOfMedals: this.country.participations.reduce(
                (acc, cur) => acc + cur.medalsCount,
                0
            ),
            numberOfAthletes: this.country.participations.reduce(
                (acc, cur) => acc + cur.athleteCount,
                0
            ),
        };
    }

    /**
     * Obtient les informations du pays.
     *
     * @returns Les informations du pays.
     */
    public getCountry(): country {
        return this.country;
    }

    /**
     * Obtient les données du pays, y compris le nombre de participations, de médailles et d'athlètes.
     *
     * @returns Les données du pays.
     */
    public getData(): {
        numberOfParticipations: number;
        numberOfMedals: number;
        numberOfAthletes: number;
    } {
        return this.data;
    }

    /**
     * Crochet de cycle de vie Angular appelé après l'initialisation du composant.
     *
     * @remarks
     * Récupère l'ID du pays à partir de l'URL, récupère les données du service olympique et formate les données du pays.
     * Vérifie les erreurs dans la réponse et navigue vers la page d'erreur si nécessaire.
     */
    ngOnInit(): void {
        this.olympics = this.olympicService.getOlympics();
        this.id = parseInt(window.location.pathname.split('/').pop() || '0');
        this.olympicsSubscription = this.olympics.subscribe((data) => {
            this.country = data.data.find((c) => c.id === this.id) || {
                id: 0,
                country: '',
                participations: [],
            };

            if (this.country.id === 0) {
                this.router.navigate(['/error']);
                this.olympicsSubscription.unsubscribe();
                return;
            }
            this.data = this.formatData();
        });
    }
}
