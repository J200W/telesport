import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import response from "../models/Response";
import country from "../models/Olympic";

/**
 * Service Angular responsable de la gestion des données olympiques.
 *
 * Ce service utilise le module HttpClient pour effectuer des requêtes HTTP et récupérer les données olympiques à partir d'un fichier JSON.
 * Il utilise également BehaviorSubject pour fournir un flux observable des données olympiques mises à jour.
 *
 * @example
 * ```
 * constructor(private olympicService: OlympicService) {}
 * ngOnInit(): void {
 *   this.olympicService.loadInitialData().subscribe();
 * }
 * ```
 *
 * @beta
 */
@Injectable({
    providedIn: 'root',
  })
  export class OlympicService {
    /**
     * URL du fichier JSON contenant les données olympiques.
     *
     * @defaultValue
     * "./assets/mock/olympic.json"
     */
    private olympicJSON = './assets/mock/olympic.json';
  
    /**
     * BehaviorSubject contenant la dernière réponse des données olympiques.
     */
    private olympics$ = new BehaviorSubject<response>({
      status: '',
      data: [],
    });
  
    /**
     * Dernière réponse des données olympiques.
     *
     * @defaultValue
     * { status: '', data: [] }
     */
    public olympicsRes: response = {
      status: '',
      data: [],
    };
  
    /**
     * Crée une instance de OlympicService.
     *
     * @param http - Le service HttpClient utilisé pour effectuer des requêtes HTTP.
     */
    constructor(private http: HttpClient) {}
  
    /**
     * Charge les données olympiques initiales à partir du fichier JSON.
     *
     * @returns Un observable de la réponse des données olympiques.
     */
    loadInitialData() {
      return this.http.get<Array<country>>(this.olympicJSON).pipe(
        tap((value) => {
          this.olympicsRes = {
            status: 'success',
            data: value,
          };
          this.olympics$.next(this.olympicsRes);
        }),
        catchError((error, caught) => {
          console.error(error);
          this.olympicsRes = {
            status: 'error',
            data: [],
          };
          this.olympics$.next(this.olympicsRes);
          return caught;
        })
      );
    }
  
    /**
     * Obtient un flux observable des données olympiques.
     *
     * @returns Un observable de la réponse des données olympiques.
     */
    getOlympics() {
      return this.olympics$.asObservable();
    }
  }
  