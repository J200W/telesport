import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import country from "../models/Olympic";

@Injectable({
    providedIn: "root",
})
export class OlympicService {
    private olympicJSON = "./assets/mock/olympic.json";

    private olympics$ = new BehaviorSubject<Array<country>>([]);

    constructor(private http: HttpClient) {}

    loadInitialData() {
        return this.http.get<Array<country>>(this.olympicJSON).pipe(
            tap((value) => {
                this.olympics$.next(value);
                console.log("Olympic service value: ", value);
            }),
            catchError((error, caught) => {
                // TODO: improve error handling
                console.error(error);
                // can be useful to end loading state and let the user know something went wrong
                this.olympics$.next([]);
                return caught;
            })
        );
    }

    getOlympics() {
        return this.olympics$.asObservable();
    }
}
