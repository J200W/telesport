import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./pages/home/home.component";
import { DetailComponent } from "./pages/detail/detail.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { OlympicChartComponent } from "./olympic-chart/olympic-chart.component";
import { NgxChartsModule } from "@swimlane/ngx-charts";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NotFoundComponent,
        DetailComponent,
        OlympicChartComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgxChartsModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
