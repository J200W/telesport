import { Component, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";
import { OlympicService } from "src/app/core/services/olympic.service";
import country from "src/app/core/models/Olympic";
import dataCountry from "src/app/core/models/DataCountry";

@Component({
    selector: "app-detail",
    templateUrl: "./detail.component.html",
    styleUrls: ["./detail.component.scss"],
})


export class DetailComponent implements OnInit {
    public olympics: Observable<country[]> = of([]);
    private id: number = 0;
    private country: country = {
        id: 0,
        country: "",
        participations: [],
    };
    private data: dataCountry = {
        numberOfParticipations: 0,
        numberOfMedals: 0,
        numberOfAthletes: 0,
    };

    constructor(private olympicService: OlympicService) {}

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

    public getCountry(): country {
        return this.country;
    }

    public getData(): {
        numberOfParticipations: number;
        numberOfMedals: number;
        numberOfAthletes: number;
    } {
        return this.data;
    }

    ngOnInit(): void {
        this.olympics = this.olympicService.getOlympics();
        this.id = parseInt(window.location.pathname.split("/").pop() || "0");
        this.olympics.subscribe((data) => {
            this.country = data.find((c) => c.id === this.id) || {
                id: 0,
                country: "",
                participations: [],
            };
            this.data = this.formatData();
        });
    }
}
