import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlympicChartDetailComponent } from './olympic-chart-detail.component';

describe('OlympicChartDetailComponent', () => {
  let component: OlympicChartDetailComponent;
  let fixture: ComponentFixture<OlympicChartDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OlympicChartDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OlympicChartDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
