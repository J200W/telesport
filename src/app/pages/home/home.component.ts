import { Component, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";
import country from "src/app/core/models/Olympic";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
    public olympics: Observable<country[]> = of([]);

    constructor() {}

    ngOnInit(): void {

    }
}
