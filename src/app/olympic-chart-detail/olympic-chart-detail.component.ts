import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import country from "../core/models/Olympic";
import response from "../core/models/Response";
import serie from "../core/models/Serie";
import { Color, ScaleType } from "@swimlane/ngx-charts";
import { OlympicService } from "../core/services/olympic.service";

@Component({
    selector: "app-olympic-chart-detail",
    templateUrl: "./olympic-chart-detail.component.html",
    styleUrls: ["./olympic-chart-detail.component.scss"],
})
export class OlympicChartDetailComponent {
    private country: country = {
        id: 0,
        country: "",
        participations: [],
    };

    public olympics: Observable<response> = of({
        status: "",
        data: [],
    });
    public serie: Array<serie> = [
        {
            name: "Country",
            series: [],
        },
    ];

    // options
    showLegend: boolean = false;
    showLabels: boolean = true;
    animations: boolean = true;
    xAxis: boolean = true;
    yAxis: boolean = true;
    showYAxisLabel: boolean = true;
    showXAxisLabel: boolean = true;
    xAxisLabel: string = "Dates";
    yAxisLabel: string = "Medals";
    timeline: boolean = true;

    colorScheme: Color = {
        domain: ["#39818d"],
        group: ScaleType.Ordinal,
        selectable: true,
        name: "Customer Usage",
    };

    constructor(
        private olympicService: OlympicService,
        private router: Router
    ) {}

    ngOnInit(): void {
        const id = parseInt(window.location.pathname.split("/").pop() || "0");
        if (Number.isNaN(id) || id === 0) {
            this.router.navigate(["/error"]);
            return;
        }
        this.olympics = this.olympicService.getOlympics();
        this.olympics.subscribe((data) => {
            if (data.status === "error") {
                this.router.navigate(["/error"]);
                return;
            }
            this.country = data.data.find((c) => c.id === id) || {
                id: 0,
                country: "",
                participations: [],
            };
            console.log("Country: ", this.country);
            if (this.country.id === 0) {
                this.router.navigate(["/error"]);
                return;
            }
            this.serie = this.format_serie(this.country);
        });
    }

    private calc_total_medals(country: country) {
        return country.participations.reduce((acc, p) => {
            return acc + p.medalsCount;
        }, 0);
    }

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
