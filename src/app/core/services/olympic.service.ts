import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import response from "../models/Response";
import country from "../models/Olympic";

@Injectable({
    providedIn: "root",
})
export class OlympicService {
    private olympicJSON = "./assets/mock/olympic.json";

    private olympics$ = new BehaviorSubject<response>({
        status: "",
        data: [],
    });
    public olympicsRes: response = {
        status: "",
        data: [],
    };

    constructor(private http: HttpClient) {}

    loadInitialData() {
        return this.http.get<Array<country>>(this.olympicJSON).pipe(
            tap((value) => {
                this.olympicsRes = {
                    status: "success",
                    data: value,
                }
                this.olympics$.next(this.olympicsRes) ;
                // console.log("Olympic service value: ", value);
            }),
            catchError((error, caught) => {
                // TODO: improve error handling
                console.error(error);
                // can be useful to end loading state and let the user know something went wrong
                this.olympicsRes = {
                    status: "error",
                    data: [],
                }
                this.olympics$.next(this.olympicsRes);
                return caught;
            })
        );
    }

    getOlympics() {
        return this.olympics$.asObservable();
    }
}
