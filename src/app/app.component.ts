import { Component, OnInit } from "@angular/core";
import { take } from "rxjs";
import { OlympicService } from "./core/services/olympic.service";

/**
 * Composant principal Angular représentant l'application.
 *
 * Ce composant est le composant racine de l'application et est chargé lors du démarrage de l'application.
 * Il utilise le service OlympicService pour charger les données initiales au moment de l'initialisation.
 *
 * @example
 * <app-root></app-root>
 */
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
  })
  export class AppComponent implements OnInit {
    /**
     * Crée une instance de AppComponent.
     *
     * @param olympicService - Le service utilisé pour charger les données olympiques.
     */
    constructor(private olympicService: OlympicService) {}
  
    /**
     * Initialise le composant après que Angular a initialisé les données liées au composant.
     */
    ngOnInit(): void {
      this.olympicService.loadInitialData().pipe(take(1)).subscribe();
    }
  }
  