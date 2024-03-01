import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./pages/home/home.component";
import { DetailComponent } from "./pages/detail/detail.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { OlympicChartComponent } from "./olympic-chart/olympic-chart.component";
import { OlympicChartDetailComponent } from "./olympic-chart-detail/olympic-chart-detail.component";
import { NgxChartsModule } from "@swimlane/ngx-charts";

/**
 * Module racine de l'application.
 * 
 * @remarks
 * Ce module est chargé lors du démarrage de l'application et est utilisé pour déclarer les composants principaux.
 * 
 * @see AppModule
 * @see AppComponent
 * @see HomeComponent
 * @see NotFoundComponent
 * @see DetailComponent
 * @see OlympicChartComponent
 * @see OlympicChartDetailComponent
 * @see AppRoutingModule
 * @see HttpClientModule
 * @see NgxChartsModule
 * @see BrowserModule
 * @see BrowserAnimationsModule
 * @see NgModule
 * 
 */
@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NotFoundComponent,
        DetailComponent,
        OlympicChartComponent,
        OlympicChartDetailComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        NgxChartsModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
