import { Component, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";
import { OlympicService } from "src/app/core/services/olympic.service";
import country from "src/app/core/models/Olympic";
import { OlympicChartComponent } from "src/app/olympic-chart/olympic-chart.component";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
    public olympics: Observable<country[]> = of([]);

    constructor(private olympicService: OlympicService) {}

    ngOnInit(): void {
        this.olympics = this.olympicService.getOlympics();
    }
}
