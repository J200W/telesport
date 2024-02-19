import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { OlympicService } from "src/app/core/services/olympic.service";
import { Observable, of } from "rxjs";
import country from "../core/models/Olympic";
import response from "../core/models/Response";
import { Color, ScaleType } from "@swimlane/ngx-charts";

@Component({
    selector: "app-olympic-chart",
    templateUrl: "./olympic-chart.component.html",
    styleUrls: ["./olympic-chart.component.scss"],
})
export class OlympicChartComponent {
    public olympics: Observable<response> = of({
        status: "",
        data: [],
    });
    public data = Array();
    public view: [number, number] = [NaN, NaN];

    gradient: boolean = false;
    showLegend: boolean = false;
    showLabels: boolean = true;
    isDoughnut: boolean = false;
    explodeSlices: boolean = false;
    legendPosition: string = "below";
    trimLabels: boolean = false;

    colorScheme: Color = {
        domain: ["#008000", "#FFAE42", "#ff0000", "#000000", "#0000FF"],
        group: ScaleType.Ordinal,
        selectable: true,
        name: "Customer Usage",
    };

    constructor(
        private olympicService: OlympicService,
        private router: Router
    ) {
        this.olympics = this.olympicService.getOlympics();
    }

    ngOnInit(): void {
        this.olympics = this.olympicService.getOlympics();
        this.olympics.subscribe((data) => {
            if (data.status === "error") {
                this.router.navigate(["/error"]);
                return;
            }
            this.data = this.format_country(data.data);
        });
    }

    private calc_total_medals(country: country) {
        return country.participations.reduce((acc, p) => {
            return acc + p.medalsCount;
        }, 0);
    }

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

    onSelect(data: any): void {
        this.router.navigate(["/detail", data.extra.id]);
    }
}
