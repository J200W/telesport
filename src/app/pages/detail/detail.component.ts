import { Component, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";
import { OlympicService } from "src/app/core/services/olympic.service";
import country from "src/app/core/models/Olympic";

@Component({
    selector: "app-detail",
    templateUrl: "./detail.component.html",
    styleUrls: ["./detail.component.scss"],
})
export class DetailComponent implements OnInit {
    public olympics: Observable<country[]> = of([]);
    private id: number = 0;
    public country: any = {};

    constructor(private olympicService: OlympicService) {}

    ngOnInit(): void {
        this.olympics = this.olympicService.getOlympics();
        this.id = parseInt(window.location.pathname.split("/").pop() || "0");
        this.olympics.subscribe((data) => {
            this.country = data.find((c) => c.id === this.id) || {};
        });
    }
}
